import React from 'react'
import {Link} from 'react-router-dom'
export default function Login() {
  return (
    <div>
        <div>
            <h3>Login to user</h3>
            <img src="" alt="" />
            <Link to="/login/user">User</Link>
        </div>
        <div>
            <h3>Login to trainer</h3>
            <img src="" alt="" />
            <Link to="/login/trainer">Trainer</Link>
        </div>
    </div>
  )
}