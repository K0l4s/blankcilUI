import React from 'react'
import './Register.css'
import { apiPath } from '../../api/endpoint'
const Register = () => {
  const url = window.location.href.split('/').slice(0, -1).join('/')
  console.log(url)
  const register = () => {
    const fullname = document.getElementById('fullname').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const birthday = document.getElementById('birthday').value
    const address = document.getElementById('address').value
    const phone = document.getElementById('phone').value
    console.log(fullname, email, password, birthday)
    fetch(apiPath+'auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Xử lý CORS Block
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify({
        fullname: fullname,
        email: email,
        password: password,
        birthday: birthday,
        address: address,
        phone: phone,
        code: '00000'
      })
    })
    .then(response => response.json())
    .then(data => {
      // if (data.status === 'success') {
      //   alert('Đăng ký thành công')
      //   //window.location.href = url + '/login'
      //   console.log(data)
      // } else {
      //   alert('Đăng ký thất bại')
      // }
      console.log(data);
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
      // Set cookie với thời gian sống là 1 ngày
      // document.cookie = `access_token=${data.access_token}; max-age=${60*60*24}`
      // document.cookie = `access_token=${data.access_token}; max-age=${60*60*24*7}`
      // Set session storage thời gian sống là 1 ngày
      sessionStorage.setItem('access_token', data.access_token)
      sessionStorage.setItem('refresh_token', data.refresh_token)
    })
  }
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
      
      <label for="birthday">Ngày sinh</label>
      <input type="date" id="birthday" name="birthday"  />
      <label for="address" >Nơi sống</label>
      <input type="text" id="address" name="birthday"  />
      <label for="phone">Số điện thoại</label>
      <input type="text" id="phone" name="phone"  />
      <button onClick={register} className="registerBtn">Đăng ký</button>
      <a href={url+"/login"}>Đã có tài khoản?</a>
      <a href={url+"/forgot-password"}>Quên mật khẩu?</a>
    </div>
  )
}

export default Register