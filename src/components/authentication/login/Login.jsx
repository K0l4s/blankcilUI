import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAPI } from '../../../api/auth/login/loginAPI';
import axios from 'axios';
import { apiPath } from '../../../api/endpoint';
import { useToast } from '@chakra-ui/react';
import { loginAction } from '../../../redux/actions/authAction';
import { motion } from 'framer-motion';

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
        <motion.div 
            id='login' 
            className="child-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="login-title">Welcome Back!</h1>
            <form onSubmit={login}>
                <div className="inputGroup">
                    <input required id='email' type="email" placeholder=' ' />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="inputGroup">
                    <input required id='password' type="password" placeholder=' ' />
                    <label htmlFor="password">Mật Khẩu</label>
                </div>
                <motion.button 
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Login
                </motion.button>
            </form>
            <motion.p 
                className='link' 
                onClick={handleIsLogin}
                whileHover={{ scale: 1.05 }}
                style={{ cursor: 'pointer' }}
            >
                Don't have an account? Register
            </motion.p>
            <motion.p 
                className='link'
                whileHover={{ scale: 1.05 }}
                style={{ cursor: 'pointer' }}
            >
                Forgot Password?
            </motion.p>

            <style jsx>{`
                .login-title {
                    color: #fff;
                    font-size: 2.5rem;
                    margin-bottom: 2rem;
                    text-align: center;
                }

                form {
                    width: 100%;
                    max-width: 400px;
                    margin: 0 auto;
                }

                .inputGroup {
                    position: relative;
                    margin-bottom: 1.5rem;
                }

                input {
                    width: 100%;
                    padding: 12px;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    color: white;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                }

                input:focus {
                    border-color: #fff;
                    outline: none;
                    background: rgba(255, 255, 255, 0.15);
                }

                label {
                    position: absolute;
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: rgba(255, 255, 255, 0.7);
                    pointer-events: none;
                    transition: 0.3s ease all;
                }

                input:focus ~ label,
                input:not(:placeholder-shown) ~ label {
                    top: -20px;
                    font-size: 0.9rem;
                    color: #fff;
                }

                button {
                    width: 100%;
                    padding: 12px;
                    background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
                    border: none;
                    border-radius: 8px;
                    color: white;
                    font-size: 1.1rem;
                    cursor: pointer;
                    margin-top: 1rem;
                    transition: all 0.3s ease;
                }

                button:hover {
                    background: linear-gradient(45deg, #ff8e8e, #ff6b6b);
                    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
                }

                .link {
                    color: rgba(255, 255, 255, 0.8);
                    margin-top: 1rem;
                    text-decoration: underline;
                    transition: color 0.3s ease;
                    text-align: center;
                }

                .link:hover {
                    color: #fff;
                }
            `}</style>
        </motion.div>
    );
};

export default Login;
