import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAPI } from '../../../api/auth/login/loginAPI';
import axios from 'axios';
import { apiPath } from '../../../api/endpoint';
import { useToast } from '@chakra-ui/react';
import { loginAction } from '../../../redux/actions/authAction';

const Login = ({ handleIsLogin, onClose }) => {
    const navigate = useNavigate();
    const toast = useToast();
    const dispatch = useDispatch();
    
    const login = async(event) => {
        event.preventDefault();
        toast({
            title: "Đăng nhập",
            description: "Vui lòng đợi trong giây lát...",
            status: "loading",
            duration: 9000,
            isClosable: true,
        })

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await loginAPI(email, password);
           
            console.log(response)
            if (response.status === 200) {
                // Clear existing tokens
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                
                // Store new tokens
                const { access_token, refresh_token } = response.data;
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);
                
                // Fetch user profile and dispatch login action
                await fetchUserProfileByToken(access_token);
                dispatch(loginAction({ access_token, refresh_token }));
                
                onClose();
                toast({
                    title: "Đăng nhập thành công!",
                    description: "Chúc bạn có những trải nghiệm tuyệt vời!",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error:', error);
            toast({
                title: "Lỗi truy cập",
                description: "Email đăng nhập hoặc mật khẩu không đúng!",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    const fetchUserProfileByToken = async (token) => {
        try {
            const response = await axios.get(`${apiPath}users/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data.body));
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div id='login' className="child-container">
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
            </form>
            <p className='link' onClick={handleIsLogin}>Don't have an account? Register</p>
            <p className='link'>Forgot Password</p>
        </div>
    );
};

export default Login;
