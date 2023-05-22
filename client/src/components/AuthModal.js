// note: this isn't complete, I'm creating this file to document the additions to this file to commmunicate with the backend requests. What's in here should be added or merged to the real file which I don't yet have on this branch

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// installed via "npm i react-cookie" in the client folder
import { useCookies } from 'react-cookie'

const AuthModal = ({setShowModal, isSignup }) => {
    // fill in consts from useStates here...

    const [cookies, setCookie, removeCookies] = useCookies('user')

let navigate = useNavigate()



const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        if(isSignUp && ( password !== confirmPassword)) {
            setError('Passwords need to match!')
            return
        } 
    // (For backend additions to work)
    const response = await axios.post('http://localhost:8000/signup', { email, password})

    setCookie('Email', response.data.email)
    setCookie('UserId', response.data.userId)
    setCookie('AuthToken', response.data.token)

    const success = response.status == 201

    if (success) navigate('/onboarding')


    } catch (error) {
        console.log(error)
    }
  
}
}

// react modal goes below ...