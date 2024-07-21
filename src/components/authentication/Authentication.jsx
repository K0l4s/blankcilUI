import React, { useEffect, useState } from 'react';
import './Authentication.css';
import Login from './login/Login';
import Register from './register/Register';
// import { isTokenExpired } from '../../config/useAuth';
import { useSelector } from 'react-redux';

const Authentication = ({ isOpen, onClose, login }) => {
    const [isLogin, setIsLogin] = useState(login);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const access_token = useSelector((state) => state.auth.access_token);
    console.log(access_token);
    console.log(isAuthenticated);
    // console.log(isAuthenticated);
    if (!isOpen)
        return;
    const token = localStorage.getItem('access_token');
    // if (token && !isTokenExpired(token)) {
    //     onClose();
    //     return;
    // }
    if(isAuthenticated && access_token){
        onClose();
        return;
    }
    const handleIsLogin = () => {
        setIsLogin(!isLogin);
    };
    return (
        <>
            <div className="overlay" onClick={onClose}></div>
            <div className='authen'>
                <div className="closeBtn" onClick={onClose}>X</div>
                {isLogin ? (
                    <Login handleIsLogin={handleIsLogin} onClose={onClose} />
                ) : (
                    <Register handleIsLogin={handleIsLogin} />
                )}
            </div>
        </>
    );
};

export default Authentication;
