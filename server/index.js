
const PORT = 8000
const express = require('express')
const { MongoClient } = require('mongodb')
const { v1: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt')

// URI I generated from my own account in mDB, can be changed if we use another account
const uri = 'mongodb+srv://nathanevanjohnson:eSRVWQufDWyRVrTi@cluster0.hkwv3n0.mongodb.net/?retryWrites=true&w=majority'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json('Hello to my app')
})

// Signing up for the app
app.post('/signup', async (req, res) => {
    const client = new MongoClient(uri)
    const { email, password} = req.body

    // generates unique user ids, returns hash of password using bcrypt package
    const generateduserId = uuid
    const hashedpassword = bcrypt.hash(password, 10)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        // check if user already exists in creation process
        const existingUser = await users.findOne ({ email })

        if (existingUser) {
            return res.status(409).send('User already exists! Please login')
        }

        const sanitizedEmail = email.toLowerCase()

        const data = {
            user_id: generateduserId,
            email: sanitizedEmail,
            hashed_password: hashedpassword
        }
       const insertedUser = await users.insertOne(data)

       // generate token that will expire in 24 hours
       const token = jwt.sign(insertedUser, sanitizedEmail, {
        expiresIn: 60 * 24,
       })

       res.status(201).json({ token, userId: generateduserId, email: sanitizedEmail})
    } catch (err) {
        console.log(err)
    }
})

app.get('/users', async (req, res) => {
    const client = new MongoClient(uri)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const returnedUsers = await users.find.toArray()
        res.send(returnedUsers)
    } finally {
        await client.close()
    }
})

app.listen(PORT, () => console.log('Server running on port' + PORT))