import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { showErrMsg, showSuccessMsg } from '../../utils/Notification/Notification'
import axios from 'axios'
import { dispatchLoginAdmin } from '../../../redux/actions/authAction'

const initialState = {
    email: '',
    password: '',
    error: '',
    success: '',
}
export default function LoginAdmin() {
    const [user, setUser] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()

    const { email, password, error, success } = user
    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value, error: '', success: '' })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/admin/login', { email, password }, { withCredentials: true })
            setUser({ ...user, error: '', success: res.data.msg })
            localStorage.setItem('admin', true)
            dispatch(dispatchLoginAdmin())
            history.push("/")
        } catch (err) {
            err.response.data.msg &&
                setUser({ ...user, error: err.response.data.msg, success: '' })
        }
    }
    return (
        <div className="form__login" style={{ paddingTop: 40, paddingBottom: 100 }}>
            {error && showErrMsg(error)}
            {success && showSuccessMsg(success)}
            <h2 className="text-center">Login</h2>

            <div className="form">
                <form className="form__bottom" onSubmit={handleSubmit}>
                    <div className="form__item">
                        <label htmlFor="email">Email</label>
                        <input type="text" required id="email" name="email"
                            value={email}
                            onChange={(e) => { handleChange(e) }}
                            placeholder="Enter email..."
                        />
                    </div>
                    <div className="form__item">
                        <label htmlFor="email">Password</label>
                        <input type="password" id="password" required name="password"
                            value={password}
                            onChange={(e) => { handleChange(e) }}
                        />
                    </div>
                    <div className="missPass">
                        <Link to="/forgot_password"><span>Quên mật khẩu ?</span></Link>
                    </div>
                    <div className="form__item">
                        <button onSubmit={(e) => { handleSubmit(e) }} className="btn-submit" type="submit">Đăng nhập</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
