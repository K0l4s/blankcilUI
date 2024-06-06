import React, { useEffect, useState } from 'react'
import './Authentication.css'
import Login from './login/Login'
import Register from './register/Register';
const Authentication = ({ isOpen, onClose, login }) => {
    const [isLogin, setIsLogin] = useState(login);
    useEffect(() => {
        if (isOpen)
            document.body.style.overflow = 'hidden';
        else
            document.body.style.overflow = 'auto';
    }, [isOpen])

    if (!isOpen || isOpen === false) return null

    const handleIsLogin = () => {
        setIsLogin(!isLogin);
    }
    return (
        <>
            <div className="overlay" onClick={onClose}></div>
            <div className='authen'>
                <div className="closeBtn" onClick={onClose}>X</div>
                {isLogin ? (
                    <Login handleIsLogin={handleIsLogin}/>
                )
                    : (
                        <Register handleIsLogin={handleIsLogin}/>
                    )}
            </div>
        </>
    )
}

export default Authentication
