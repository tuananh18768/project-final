import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg, errorNotifi } from '../../utils/Notification/Notification'
import { dispatchLoginUser } from '../../../redux/actions/authAction'
import { useDispatch } from 'react-redux'
import './loginUser.css'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const initialState = {
  email: '',
  password: '',
  error: '',
  success: '',
}
export default function LoginUser() {
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
      const res = await axios.post('/user/login', { email, password }, { withCredentials: true })
      setUser({ ...user, error: '', success: res.data.msg })
      localStorage.setItem('firstLogin', true)
      dispatch(dispatchLoginUser())
      history.push("/")
    } catch (err) {
      err.response.data.msg &&
        // setUser({ ...user, error: err.response.data.msg, success: '' })
        errorNotifi(err.response.data.msg)
    }
  }
  const responseGoogle = async (response) => {
    try {
      const res = await axios.post('/user/google_login', { tokenId: response.tokenId })
      setUser({ ...user, error: '', success: res.data.msg })
      localStorage.setItem('firstLogin', true)

      dispatch(dispatchLoginUser())
      history.push("/")
    } catch (error) {
      setUser({ ...user, error: error.response.data.msg, success: '' })
    }
  }
  const responseFacebook = async (response) => {
    try {
      const { accessToken, userID } = response
      const res = await axios.post('/user/facebook_login', { accessToken, userID })
      setUser({ ...user, error: '', success: res.data.msg })
      localStorage.setItem('firstLogin', true)

      dispatch(dispatchLoginUser())
      history.push("/")
    } catch (error) {
      setUser({ ...user, error: error.response.data.msg, success: '' })
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="form__login" style={{ paddingTop: 15, paddingBottom: 40 }}>
      {error && showErrMsg(error)}
      {success && showSuccessMsg(success)}

      <div className="form">
        <div className="form__top">
          <h2>Đăng nhập</h2>
          <div className="btn__facebook">
            <div className="btn__item">
              <FacebookLogin
                appId="411250757188462"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
              />
            </div>
          </div>
          <div className="btn__google">
            <div className="btn__item">
              <GoogleLogin
                clientId="654178485379-r8o78vkrg9d49vifdfc0pfh7u8jd5tef.apps.googleusercontent.com"
                buttonText="Login with google"
                onSuccess={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </div>
          </div>
          <div className="round">
            <p>Hoặc tiếp tục với</p>
          </div>
        </div>
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
            <Link to="/forgot_password_user"><span>Quên mật khẩu ?</span></Link>
          </div>
          <div className="form__item">
            <button onSubmit={(e) => { handleSubmit(e) }} className="btn-submit" type="submit">Đăng nhập</button>
          </div>
          <div className="footer">
            <div className="text">
              <span>Bạn chưa có tài khoản ?</span>
              <Link to="/register/user" className="text__login">Đăng ký</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
