import React from 'react'
import './Register.css'
const Register = () => {
  return (
    <div className="register">
        <div className="registerWrapper">
            <label>Username</label>
            <input type="text" placeholder="Enter your username" />
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
            <button className="registerBtn">Register</button>
          </div>
    </div>
  )
}

export default Register