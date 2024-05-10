import React, { useEffect, useState } from 'react'
import './Login.css'
import { apiPath } from '../../api/endpoint'
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    if (localStorage.getItem('access_token') || sessionStorage.getItem('access_token')) {
      navigate('/blankcilUI')
    }
    toast({
      title: "Lỗi truy cập",
      description: "Vui lòng đăng xuất trước!",
      status: "error",
      duration: 9000,
      isClosable: true,
    })
  }
  )
  const login = () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    console.log(email, password)
    //Axios
    fetch(apiPath + 'auth/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          alert('Đăng ký thành công')
          //window.location.href = url + '/login'
          console.log(data)
        } else {
          alert('Đăng ký thất bại')
        }
        console.log(data);
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)
      })
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <h1>BLANKCIL</h1>
        <p>Healing your soul!</p>
        <div className="loginBox">
          <input placeholder="Email" id='email' type="email" className="loginInput" />
          <input placeholder="Password" id='password' type="password" className="loginInput" />
          <button onClick={login} className="loginButton">Log In</button>
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