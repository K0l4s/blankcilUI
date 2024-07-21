// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { loginAPI, googleOauth2API } from '../../../api/auth/login/loginAPI';
// import axios from 'axios';
// import { apiPath } from '../../../api/endpoint';
// import { useToast } from '@chakra-ui/react';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

// const Login = ({ handleIsLogin, onClose }) => {
//     const navigate = useNavigate();
//     const toast = useToast();


//     const login = (event) => {
//         event.preventDefault();

//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;
//         console.log(email, password);

//         loginAPI(email, password)
//             .then((response) => {
//                 const status = response.status;
//                 if (status === 200) {
//                     localStorage.removeItem('access_token');
//                     localStorage.removeItem('refresh_token');
//                     localStorage.setItem('access_token', response.data.access_token);
//                     localStorage.setItem('refresh_token', response.data.refresh_token);
//                     fetchUserProfileByToken(response.data.access_token);
//                     onClose();
//                     toast({
//                         title: "Đăng nhập thành công!",
//                         description: "Chúc bạn có những trải nghiệm tuyệt vời!",
//                         status: "success",
//                         duration: 9000,
//                         isClosable: true,
//                     });
//                 } else {
//                     toast({
//                         title: "Lỗi truy cập",
//                         description: "Email đăng nhập hoặc mật khẩu không đúng!",
//                         status: "error",
//                         duration: 9000,
//                         isClosable: true,
//                     });
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//                 toast({
//                     title: "Lỗi truy cập",
//                     description: "Email đăng nhập hoặc mật khẩu không đúng!",
//                     status: "error",
//                     duration: 9000,
//                     isClosable: true,
//                 });
//             });
//     };

//     const fetchUserProfileByToken = async (token) => {
//         axios.get(apiPath + 'users/profile', {
//             headers: {
//                 'ngrok-skip-browser-warning': 'any_value',
//                 'Authorization': `Bearer ${token}`
//             }
//         }).then((response) => {
//             if (response.status === 200) {
//                 localStorage.setItem('user', JSON.stringify(response.data.body));
//             }
//             console.log(response.data);
//         }).catch((error) => {
//             console.error('Error:', error);
//         });
//     };

//     const onGoogleLoginSuccess = async (tokenResponse) => {
//         try {
//             const { credential } = tokenResponse;
//             const googleLoginResponse = await googleOauth2API(credential);
//             console.log(googleLoginResponse);
//             if (googleLoginResponse.status === 200) {
//                 localStorage.setItem('access_token', googleLoginResponse.data.access_token);
//                 localStorage.setItem('refresh_token', googleLoginResponse.data.refresh_token);

//                 fetchUserProfileByToken(googleLoginResponse.data.access_token);

//                 onClose();
//                 toast({
//                     title: "Đăng nhập thành công!",
//                     description: "Chúc bạn có những trải nghiệm tuyệt vời!",
//                     status: "success",
//                     duration: 9000,
//                     isClosable: true,
//                 });
//             }
//             else {
//                 toast({
//                     title: "Lỗi truy cập",
//                     description: "Something went wrong",
//                     status: "error",
//                     duration: 9000,
//                     isClosable: true,
//                 });
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const onGoogleLoginFailure = (error) => {
//         console.error(error);
//     };

//     return (
//         <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
//             <div id='login' className="child-container">
//                 <h1>Login</h1>
//                 <form onSubmit={login}>
//                     <div className="inputGroup">
//                         <input required id='email' type="email" placeholder=' ' />
//                         <label htmlFor="email">Email</label>
//                     </div>
//                     <div className="inputGroup">
//                         <input required id='password' type="password" placeholder=' ' />
//                         <label htmlFor="password">Mật Khẩu</label>
//                     </div>
//                     <button type="submit">Login</button>
//                     <div className="google-login-btn">
//                         <GoogleLogin
//                             onSuccess={onGoogleLoginSuccess}
//                             onError={onGoogleLoginFailure}
//                         />
//                     </div>
//                 </form>
//                 <p className='link' onClick={handleIsLogin}>Don't have an account? Register</p>
//                 <p className='link'>Forgot Password</p>
//             </div>
//         </GoogleOAuthProvider>
//     );
// };

// export default Login;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAPI, googleOauth2API } from '../../../api/auth/login/loginAPI';
import axios from 'axios';
import { apiPath } from '../../../api/endpoint';
import { useToast } from '@chakra-ui/react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { loginAction } from '../../../redux/actions/authAction';

const Login = ({ handleIsLogin, onClose }) => {
    const navigate = useNavigate();
    const toast = useToast();
    const dispatch = useDispatch();
    
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
                    const access_token = response.data.access_token;
                    const refresh_token = response.data.refresh_token;
                    fetchUserProfileByToken(response.data.access_token);
                    dispatch(loginAction({ access_token,refresh_token })); // Dispatch login action
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

    const onGoogleLoginSuccess = async (tokenResponse) => {
        try {
            const { credential } = tokenResponse;
            const googleLoginResponse = await googleOauth2API(credential);
            console.log(googleLoginResponse);
            if (googleLoginResponse.status === 200) {
                localStorage.setItem('access_token', googleLoginResponse.data.access_token);
                localStorage.setItem('refresh_token', googleLoginResponse.data.refresh_token);

                fetchUserProfileByToken(googleLoginResponse.data.access_token);
                dispatch(loginAction({ email: 'GoogleUser' })); // Dispatch login action with Google login
                onClose();
                toast({
                    title: "Đăng nhập thành công!",
                    description: "Chúc bạn có những trải nghiệm tuyệt vời!",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
            }
            else {
                toast({
                    title: "Lỗi truy cập",
                    description: "Something went wrong",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onGoogleLoginFailure = (error) => {
        console.error(error);
    };

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
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
                    <div className="google-login-btn">
                        <GoogleLogin
                            onSuccess={onGoogleLoginSuccess}
                            onError={onGoogleLoginFailure}
                        />
                    </div>
                </form>
                <p className='link' onClick={handleIsLogin}>Don't have an account? Register</p>
                <p className='link'>Forgot Password</p>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
