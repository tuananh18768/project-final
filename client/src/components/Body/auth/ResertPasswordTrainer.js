import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { errorNotifi, successNotifi } from '../../utils/Notification/Notification'
import { isPassword, isCf_pass } from '../../utils/validation/validation'


const initialState = {
    password: '',
    cf_password: '',
    error: '',
    success: '',
}
function ResertPassword() {
    const { token } = useParams()
    const [data, setData] = useState(initialState)

    const { password, cf_password, error, success } = data

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, error: '', success: '' })
    }
    const handleResetPass = async () => {
        if (!isPassword(password)) {
            errorNotifi('Password must be at least 6 characters!!!')
            return false
        }
        if (!isCf_pass(password, cf_password)) {
            errorNotifi('Password is not match!')
            return false
        }
        try {
            const res = await axios.post('/trainer/reset', { password })
            setData({ ...data, error: '', success: res.data.msg })
            successNotifi(res.data.msg)
        } catch (error) {
            error.response.msg &&
                setData({ ...data, error: error.response.msg, success: '' })
            errorNotifi(error.response.msg)
        }
    }
    return (
        <div className="fg_pass">
            <h2>Reset Your Password</h2>
            <div className="row">

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password}
                    onChange={handleChangeInput} />

                <label htmlFor="cf_password">Confirm Password</label>
                <input type="password" name="cf_password" id="cf_password" value={cf_password}
                    onChange={handleChangeInput} />

                <button onClick={handleResetPass}>Reset Password</button>
            </div>
        </div>
    )
}

export default ResertPassword