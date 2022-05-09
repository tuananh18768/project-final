import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../utils/Notification/Notification'
import { dispatchLogin } from '../../../redux/actions/authAction'
import { useDispatch } from 'react-redux'
import { isEmpty, isEmail, isPassword, isCf_pass } from '../../utils/validation/validation'
const initialState = {
  name: '',
  email: '',
  password: '',
  cf_password: '',
  error: '',
  success: '',
}
export default function RegisterUser() {
  const [user, setUser] = useState(initialState)


  const { name, email, password, cf_password, error, success } = user
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value, error: '', success: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isEmpty(name) || !isEmpty(password)) {
      return setUser({ ...user, error: 'Please fill in all fields.', success: '' })
    }
    if (!isEmail(email)) {
      return setUser({ ...user, error: 'Invalid email.', success: '' })
    }
    if (!isPassword(password)) {
      return setUser({ ...user, error: 'Password must be at least 6 characters.', success: '' })
    }
    if (!isCf_pass(password, cf_password)) {
      return setUser({ ...user, error: 'Password is not match!!', success: '' })
    }
    try {
      const res = await axios.post('http://localhost:5000/user/register', { name, email, password })
      setUser({ ...user, error: '', success: res.data.msg })
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, error: err.response.data.msg, success: '' })
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="form__login" style={{ paddingTop: 15, paddingBottom: 40 }}>
      {error && showErrMsg(error)}
      {success && showSuccessMsg(success)}
      <form onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: 35 }}>Đăng ký</h2>
        <div className="form__item">
          <label>Name</label>
          <input type="text" id="email" name="name"
            value={name}
            onChange={(e) => { handleChange(e) }}
          />
        </div>
        <div className="form__item">
          <label>Email Address</label>
          <input type="text" id="name" name="email"
            value={email}
            onChange={(e) => { handleChange(e) }}
          />
        </div>
        <div className="form__item">
          <label>Password</label>
          <input type="password" id="password" name="password"
            value={password}
            onChange={(e) => { handleChange(e) }}
          />
        </div>
        <div className="form__item">
          <label>Confirm Password</label>
          <input type="password" id="cf_password" name="cf_password"
            value={cf_password}
            onChange={(e) => { handleChange(e) }}
          />
        </div>
        <div className="form__item">

          <button onSubmit={(e) => { handleSubmit(e) }} className="btn-submit" type="submit">
            Register
          </button>
          {/* <div className="forgot"> */}
        </div>
        {/* </div> */}
      </form>
      <div className="footer">
        <div className="text">
          <span>Bạn đã có tài khoản ?</span>
          <Link to="/login/user" className="text__login">Đăng nhập</Link>
        </div>
      </div>
    </div>
  )
}
