import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../utils/Notification/Notification'
import { dispatchLogin } from '../../../redux/actions/authAction'
import { useDispatch } from 'react-redux'
import { isEmpty, isEmail, isPassword, isCf_pass } from '../../utils/validation/validation'
import { errorNotifi, successNotifi } from '../../utils/Notification/Notification'

const initialState = {
  name: '',
  email: '',
  password: '',
  experience: '',
  skills: '',
  graduate: '',
  cf_password: '',
  error: '',
  success: '',
}
export default function RegisterUser() {
  const [user, setUser] = useState(initialState)


  const { name, email, password, experience, skills, graduate, cf_password, error, success } = user
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value, error: '', success: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isEmpty(name) || !isEmpty(password)) {
      errorNotifi('Please fill in all fields.')
      return false
    }
    if (!isEmail(email)) {
      errorNotifi('Invalid email.')
      return false
    }
    if (!isPassword(password)) {
      errorNotifi('Password must be at least 6 characters.')
      return false
    }
    if (!isCf_pass(password, cf_password)) {
      errorNotifi('Password is not match!!')
      return false
    }
    try {
      const res = await axios.post('http://localhost:5000/trainer/register', { name, email, password, experience, skills, graduate })
      setUser({ ...user, error: '', success: res.data.msg })
      successNotifi(res.data.msg)
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, error: err.response.data.msg, success: '' })
      errorNotifi(err.response.data.msg)
    }
  }
  return (
    // <div className="login_page">
    //   <h2>Register Trainer</h2>
    //   {error && showErrMsg(error)}
    //   {success && showSuccessMsg(success)}
    //   <form onSubmit={handleSubmit}>
    //       <label>Name</label>
    //   <div className="user-box">
    //       <input type="text"   id="email" name="name"
    //         value={name} 
    //         onChange={(e)=>{handleChange(e)}}
    //         />
    //     </div>
    //       <label>Email Address</label>
    //     <div className="user-box">
    //       <input type="text"   id="name" name="email"
    //         value={email} 
    //         onChange={(e)=>{handleChange(e)}}
    //         />
    //     </div>
    //     <label>Experience</label>
    //     <div className="user-box">
    //       <input type="text"   id="name" name="experience"
    //         value={experience} 
    //         onChange={(e)=>{handleChange(e)}}
    //         />
    //     </div>
    //     <label>Skills</label>
    //     <div className="user-box">
    //       <textarea type="text"   id="name" name="skills"
    //         value={skills}
    //         onChange={(e)=>{handleChange(e)}}
    //         />
    //     </div>
    //     <label>Graduate</label>
    //     <div className="user-box">
    //       <input type="text"   id="name" name="graduate"
    //         value={graduate} 
    //         onChange={(e)=>{handleChange(e)}}
    //         />
    //     </div>
    //       <label>Password</label>
    //     <div className="user-box">
    //       <input type="password" id="password"  name="password"
    //         value={password} 
    //           onChange={(e)=>{handleChange(e)}}
    //         />
    //     </div>
    //       <label>Confirm Password</label>
    //     <div className="user-box">
    //       <input type="password" id="cf_password"  name="cf_password"
    //         value={cf_password} 
    //           onChange={(e)=>{handleChange(e)}}
    //         />
    //     </div>
    //     <div className="row">

    //       <button onSubmit={(e)=>{handleSubmit(e)}} className="button"type="submit"> 
    //         Register
    //       </button>
    //       {/* <div className="forgot"> */}
    //       </div>
    //     {/* </div> */}
    //   </form>
    //   <p>Already an account? <Link to="/login/trainer">Login</Link></p>
    // </div>
    <div className="form__login" style={{ paddingTop: 15, paddingBottom: 40 }}>
      {/* {error && errorNotifi(error)} */}
      {/* {success && successNotifi(success)} */}
      <form onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: 35 }}>Đăng ký</h2>
        <div className="form__item">
          <label>Name</label>
          <input type="text" id="name" name="name"
            value={name}
            onChange={(e) => { handleChange(e) }}
          />
        </div>
        <div className="form__item">
          <label>Email Address</label>
          <input type="text" id="email" name="email"
            value={email}
            onChange={(e) => { handleChange(e) }}
          />
        </div>
        <div className="form__item">
          <label>Experience</label>
          <input type="text" id="email" name="experience"
            value={experience}
            onChange={(e) => { handleChange(e) }}
          />
        </div>
        <div className="form__item">
          <label>Skills</label>
          <input type="text" id="email" name="skills"
            value={skills}
            onChange={(e) => { handleChange(e) }}
          />
        </div>
        <div className="form__item">
          <label>Graduate</label>
          <input type="text" id="email" name="graduate"
            value={graduate}
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
        </div>
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
