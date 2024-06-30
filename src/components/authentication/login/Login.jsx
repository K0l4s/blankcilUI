import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../../../api/auth/login/loginAPI';
import axios from 'axios';
import { apiPath } from '../../../api/endpoint';
import { useToast } from '@chakra-ui/react';
import { FcGoogle } from "react-icons/fc";

const Login = ({ handleIsLogin, onClose }) => {
    const navigate = useNavigate();
    const toast = useToast();


    const login = (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log(email, password);

        loginAPI(email, password)
            .then((response) => {
                const status = response.status;
                if (status === 200) {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    localStorage.setItem('access_token', response.data.access_token);
                    localStorage.setItem('refresh_token', response.data.refresh_token);
                    fetchUserProfileByToken(response.data.access_token);
                    onClose();
                    toast({
                        title: "Đăng nhập thành công!",
                        description: "Chúc bạn có những trải nghiệm tuyệt vời!",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    });
                } else {
                    toast({
                        title: "Lỗi truy cập",
                        description: "Email đăng nhập hoặc mật khẩu không đúng!",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                toast({
                    title: "Lỗi truy cập",
                    description: "Email đăng nhập hoặc mật khẩu không đúng!",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            });
    };

    const fetchUserProfileByToken = async (token) => {
        axios.get(apiPath + 'users/profile', {
            headers: {
                'ngrok-skip-browser-warning': 'any_value',
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data.body));
            }
            console.log(response.data);
        }).catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div id='login' className="login">
            <h1>Login</h1>
            <form onSubmit={login}>
                <div className="inputGroup">
                    <input required id='email' type="email" placeholder=' ' />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="inputGroup">
                    <input required id='password' type="password" placeholder=' ' />
                    <label htmlFor="password">Mật Khẩu</label>
                </div>
                <button type="submit">Login</button>
                <button className='anotherMethod'>Đăng nhập bằng <FcGoogle/></button>
            </form>
            
            <p className='link' onClick={handleIsLogin}>Don't have an account? Register</p>
            <p className='link'>Forgot Password</p>
        </div>
    );
};

export default Login;
