import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import Login from './login/Login';
import Register from './register/Register';

const Authentication = ({ isOpen, onClose, login }) => {
    const [isLogin, setIsLogin] = useState(login);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const access_token = useSelector((state) => state.auth.access_token);

    if (!isOpen) return null;
    
    if (isAuthenticated && access_token) {
        onClose();
        return null;
    }

    const handleIsLogin = () => {
        setIsLogin(!isLogin);
    };

    return (
        <AnimatePresence>
            <motion.div 
                className="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />
            <motion.div 
                className='authen'
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
            >
                <motion.div 
                    className="closeBtn" 
                    onClick={onClose}
                    whileHover={{ rotate: 180 }}
                    whileTap={{ scale: 0.8 }}
                >
                    <IoClose size={24} />
                </motion.div>

                <motion.div
                    key={isLogin ? "login" : "register"}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    className="form-container"
                >
                    {isLogin ? (
                        <Login handleIsLogin={handleIsLogin} onClose={onClose} />
                    ) : (
                        <Register handleIsLogin={handleIsLogin} onClose={onClose} />
                    )}
                </motion.div>
            </motion.div>

            <style jsx>{`
                .overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9));
                    backdrop-filter: blur(12px);
                    z-index: 9999;
                }

                .authen {
                    position: fixed;
                    width: 95%;
                    top:5%;
                    left: 3%;
                    min-height: 500px;
                    background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
                    backdrop-filter: blur(20px);
                    border-radius: 30px;
                    border: 2px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
                    z-index: 10000;
                    padding: 2.5rem;
                    overflow: hidden;
                }

                .form-container {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .closeBtn {
                    position: absolute;
                    top: 1.2rem;
                    right: 1.2rem;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255, 255, 255, 0.15);
                    color: white;
                    cursor: pointer;
                    transition: all 0.4s ease;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .closeBtn:hover {
                    background: rgba(255, 255, 255, 0.25);
                    box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
                }

                @media (max-width: 768px) {
                    .authen {
                        width: 90%;
                        padding: 1.5rem;
                    }
                }
            `}</style>
        </AnimatePresence>
    );
};

export default Authentication;
