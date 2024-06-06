import React from 'react'

const Login = ({handleIsLogin}) => {
  return (
    <div id='login' className="login">
                        <h1>Login</h1>
                        <form>
                            <div className="inputGroup">
                                <input required id='email' type="email" placeholder=' ' />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="inputGroup">
                                <input required id='password' type="password" placeholder=' ' />
                                <label htmlFor="password">Mật Khẩu</label>
                            </div>
                            <button type="submit">Login</button>
                        </form>
                        <p className='link' onClick={handleIsLogin}>Don't have an account? Register</p>
                        <p className='link'>Forgot Password</p>
                    </div>
  )
}

export default Login