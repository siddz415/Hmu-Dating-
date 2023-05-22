import Nav from '../components/Nav'
import { useState } from 'react'

// additions here are simply from the part of the video that touches on backend operations

import { useCookies } from 'react-cookie'

const OnBoarding = () => {
    const [cookies, setCookie, removeCookie]= useCookies(['user'])
    const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: '',
    dob_day: '',
    dob_month: '',
    dob_year: '',
    show_gender: false,
    gender_identity: 'man',
    gender_interest: 'woman',
    url: '',
    about: '',
    matches: []
})

const handleSubmit = () => {
    console.log('submitted')

}

return (
    // fill in relevant react code here
    


    <div className="photo-container">
        {formData.url && <img src={formData.url} alt="profile pic preview" />}
    </div>
    )
}


export default OnBoarding