import React, { useEffect, useState } from 'react'
import './Login.css'
import { apiPath } from '../../api/endpoint'
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import logo from '../../access/images/logos.png'
const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      navigate('/')
      toast({
        title: "Bạn đã đăng nhập!",
        description: "Chúng tôi nhận thấy một phiên đăng nhập của bạn trên trình duyệt, xin hãy đăng xuất trước!",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
    
  }
  )
  const login = () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    console.log(email, password)
    axios.post(apiPath + 'auth/authenticate', {
      email: email,
      password: password
    }).then((response) => {
      // console.log(response)
      const status = response.status;
      // const newToken = response.data.body.token;
      if (status == '200') {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.setItem('access_token', response.data.access_token)
        localStorage.setItem('refresh_token', response.data.refresh_token)
        fetchUserProfileByToken(response.data.access_token)
        
        toast({
          title: "Đăng nhập thành công!",
          description: "Chúc bạn có những trải nghiệm tuyệt vời!",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }
      else {
        toast({
          title: "Lỗi truy cập",
          description: "Email đăng nhập hoặc mật khẩu không đúng!",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
    }).catch((error) => {
      console.error('Error:', error);
      toast({
        title: "Lỗi truy cập",
        description: "Email đăng nhập hoặc mật khẩu không đúng!",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    });
  }
  const fetchUserProfileByToken = async (token) => {
    // const token = localStorage.getItem('access_token');
    axios.get(apiPath + 'users/profile', {
      headers: {
        'ngrok-skip-browser-warning': 'any_value',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      if(response.status == '200'){
        localStorage.setItem('user', JSON.stringify(response.data.body));
        navigate('/')
        // console.log('User: '+localStorage.getItem('user'))
        // // Get user profile trả về json
        // const user = JSON.parse(localStorage.getItem('user'));
        // console.log('User: '+user.email)
      }
      console.log(response.data);
    }
    ).catch((error) => {
      console.error('Error:', error);
    });
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <h1>LOGIN</h1>
        <div className="loginBox">
          <input style={{color:"white"}} placeholder="Email" id='email' type="email" className="loginInput" />
          <input style={{color:"white"}} placeholder="Password" id='password' type="password" className="loginInput" />
          <button onClick={login} className="loginButton">Log In</button>
          <button className="loginRegisterButton" onClick={()=>navigate("/register")}>
            Create a New Account
          </button>
          <span className="loginForgot" onClick={()=>navigate("/reset/password")}>Forgot Password?</span>

        </div>
      </div>
    <div className="logo">
    <img src={logo} alt="logo" />
    </div>
    </div>
  )
}

export default Login