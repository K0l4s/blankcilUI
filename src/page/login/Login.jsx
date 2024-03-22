import React from 'react'
import './Login.css'
const Login = () => {
    return (
        <div className="login">
            <div className="loginWrapper">
                <h1>BLANKCIL</h1>
                <p>Healing your soul!</p>
                    <div className="loginBox">
                        <input placeholder="Email" type="email" className="loginInput" />
                        <input placeholder="Password" type="password" className="loginInput" />
                        <button className="loginButton">Log In</button>
                        <button className="loginRegisterButton">
                            Create a New Account
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        
                    </div>
                </div>
        </div>
    )
}

export default Login