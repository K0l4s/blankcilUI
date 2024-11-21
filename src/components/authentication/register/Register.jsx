import React from 'react'
import { registerAPI } from '../../../api/auth/register/register'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Register = ({ handleIsLogin, onClose }) => {
    const navigate = useNavigate()

    const handleReigster = (event) => {
        event.preventDefault()
        
        const registerRequest = JSON.stringify({
            fullname: document.getElementById('re_fullname').value,
            nickname: document.getElementById('re_nickName').value, 
            email: document.getElementById('re_email').value,
            password: document.getElementById('re_password').value,
            birthday: document.getElementById('re_birthday').value,
            phone: document.getElementById('re_phone').value
        })

        registerAPI(registerRequest)
            .then(response => {
                navigate("/confirm/register/" + document.getElementById('re_email').value)
                onClose()
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <motion.div
            id='register'
            className="child-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="register-title">Register</h1>

            <form onSubmit={handleReigster}>
                <div className="form-row">
                    <div className="inputGroup">
                        <input 
                            required 
                            id='re_fullname'
                            type="text"
                            placeholder=' '
                        />
                        <label htmlFor="re_fullname">Họ và tên</label>
                    </div>

                    <div className="inputGroup">
                        <input 
                            required
                            id='re_nickName'
                            type="text"
                            placeholder=' '
                        />
                        <label htmlFor="re_nickName">Ciler name</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="inputGroup">
                        <input 
                            required
                            id='re_email'
                            type="email"
                            placeholder=' '
                        />
                        <label htmlFor="re_email">Email</label>
                    </div>

                    <div className="inputGroup">
                        <input 
                            required
                            id='re_password'
                            type="password"
                            placeholder=' '
                        />
                        <label htmlFor="re_password">Mật Khẩu</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="inputGroup">
                        <input 
                            required
                            id='re_birthday'
                            type="date"
                            placeholder=' '
                        />
                        <label htmlFor="re_birthday">Ngày sinh</label>
                    </div>

                    <div className="inputGroup">
                        <input 
                            required
                            id='re_phone'
                            type="text"
                            placeholder=' '
                        />
                        <label htmlFor="re_phone">Số điện thoại</label>
                    </div>
                </div>

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Next Step
                </motion.button>
            </form>

            <motion.p
                className='link'
                onClick={handleIsLogin}
                whileHover={{ scale: 1.05 }}
                style={{ cursor: 'pointer' }}
            >
                Already have an account? Login
            </motion.p>

            <style jsx>{`
                .register-title {
                    color: #fff;
                    font-size: 2.5rem;
                    margin-bottom: 2rem;
                    text-align: center;
                }

                form {
                    width: 100%;
                    max-width: 800px;
                    margin: 0 auto;
                }

                .form-row {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .inputGroup {
                    position: relative;
                    flex: 1;
                }

                input {
                    width: 100%;
                    padding: 10px;
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
                    left: 10px;
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

                @media (max-width: 768px) {
                    .form-row {
                        flex-direction: column;
                        gap: 1.5rem;
                    }

                    form {
                        max-width: 400px;
                    }
                }
            `}</style>
        </motion.div>
    )
}

export default Register