import React from 'react'
import { Link } from 'react-router-dom'
export default function Login() {
  return (
    <div className="row loginAll" style={{ padding: '100px' }}>
      <div className="col-6 text-center">
        <h3 >Login to user</h3>
        <Link to="/login/user">
          <img src="./img/trainee.jpg" alt="" style={{ width: '200px', height: '200px', objectFit: "cover", borderRadius: '10px', margin: '15px auto' }} />
        </Link>
        <Link className="loginFormat" to="/login/user">User</Link>
      </div>
      <div className="col-6 text-center">
        <h3>Login to trainer</h3>
        <Link to="/login/trainer">
          <img src="./img/trainer.jpg" alt="" style={{ width: '200px', height: '200px', objectFit: "cover", borderRadius: '10px', margin: '15px auto' }} />
        </Link>
        <Link className="loginFormat" to="/login/trainer">Trainer</Link>
      </div>
    </div>
  )
}