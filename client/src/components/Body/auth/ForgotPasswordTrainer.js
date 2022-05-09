import React, { useState } from 'react'
import axios from 'axios'
import { isEmail } from '../../utils/validation/validation'
import { errorNotifi, successNotifi } from '../../utils/Notification/Notification'

const initialState = {
    email: '',
    error: '',
    success: '',
}
function ForgotPassword() {
    const [data, setData] = useState(initialState)
    const { email, error, success } = data

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value,
            error: '',
            success: '',
        })
        console.log(data)
    }
    const forgotPassword = async () => {
        if (!isEmail(email)) {
            return setData({ ...data, error: 'Invalid email', success: '' })
        }
        try {
            const res = await axios.post('/trainer/forgot', { email })
            setData({ ...data, error: '', success: res.data.msg })
            successNotifi(res.data.msg)
        } catch (error) {
            error.response.data.msg &&
                setData({ ...data, error: error.response.data.msg, success: '' })
            errorNotifi(error.response.data.msg)

        }
    }
    return (
        <div className="fg_pass">
            <h2>Forgot your Password?</h2>
            <div className="row">
                <label htmlFor="email">Enter your email address</label>
                <input type="email" name="email" value={email} id="email" onChange={(e) => { handleChangeInput(e) }} />
                <button onClick={(e) => { forgotPassword(e) }}>Verify your email</button>
            </div>
        </div>
    )
}

export default ForgotPassword