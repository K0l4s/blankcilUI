import React from 'react'

const Register = ({handleIsLogin}) => {
  return (
    <div id='register' className="register">
                            <h1>Register</h1>
                            <form>
                                <div className="inputGroup">
                                    <input required id='name' type="text" placeholder=' ' />
                                    <label htmlFor="password">Họ và tên</label>
                                </div>
                                <div className="inputGroup">
                                    <input required id='email' type="email" placeholder=' ' />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="inputGroup">
                                    <input required id='password' type="password" placeholder=' ' />
                                    <label htmlFor="password">Mật Khẩu</label>
                                </div>
                                <div className="inputGroup">
                                    <input required id='confirmPassword' type="password" placeholder=' ' />
                                    <label htmlFor="confirmPassword">Xác Nhận Mật Khẩu</label>
                                </div>
                                <button type="submit">Register</button>
                            </form>
                            <p className='link' onClick={handleIsLogin}>Already have an account? Login</p>
                        </div>
  )
}

export default Register