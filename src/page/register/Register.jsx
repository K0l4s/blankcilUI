import React from 'react'
import './Register.css'
const Register = () => {
  const url = window.location.href.split('/').slice(0, -1).join('/')
  console.log(url)
  return (
    <div className="registerBox">
      {/* <label>Username</label>
            <input type="text" placeholder="Enter your username" />
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
            <button className="registerBtn">Register</button> */}
      <h1>Đăng ký</h1>
      <label for="fullname">Họ và tên</label>
      <input type="text" placeholder='Nhập họ và tên' id="fullname" name="fullname" required />
      <label for="email">Email</label>
      <input type="email" placeholder='Nhập email' id="email" name="email" required />
      <label for="password">Mật khẩu</label>
      <input type="password" placeholder='Nhập lại mật khẩu' id="password" name="password" required />
      
      <label for="birthday" className="registerBirthday">Ngày sinh</label>
      <input type="date" id="birthday" name="birthday" className="registerBirthday" />
      <button className="registerBtn">Đăng ký</button>
      <a href={url+"/login"}>Đã có tài khoản?</a>
      <a href={url+"/forgot-password"}>Quên mật khẩu?</a>
    </div>
  )
}

export default Register