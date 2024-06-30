import React from 'react'
import {registerAPI} from '../../../api/auth/register/register'
import { useNavigate } from 'react-router-dom'

const Register = ({ handleIsLogin }) => {
    const navigate = useNavigate()

    const handleReigster = (event) => {
        event.preventDefault();
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
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }
    return (
        <div id='register' className="register">
            <h1>Register</h1>
            <form onSubmit={handleReigster}>
                <div className="inputGroup">
                    <input required id='re_fullname' type="text" placeholder=' ' />
                    <label htmlFor="re_fullname">Họ và tên</label>
                </div>
                <div className="inputGroup">
                    <input required id='re_nickName' type="text" placeholder=' ' />
                    <label htmlFor="re_nickName">Ciler name</label>
                </div>
                <div className="inputGroup">
                    <input required id='re_email' type="email" placeholder=' ' />
                    <label htmlFor="re_email">Email</label>
                </div>
                <div className="inputGroup">
                    <input required id='re_password' type="password" placeholder=' ' />
                    <label htmlFor="re_password">Mật Khẩu</label>
                </div>
                <div className="inputGroup">
                    <input required id='re_birthday' type="date" placeholder=' ' />
                    <label htmlFor="re_birthday">Ngày sinh</label>
                </div>
                <div className="inputGroup">
                    <input required id='re_phone' type="text" placeholder=' ' />
                    <label htmlFor="re_phone">Ngày sinh</label>
                </div>
                <button type="submit">Next Step</button>
            </form>
            <p className='link' onClick={handleIsLogin}>Already have an account? Login</p>
        </div>
    )
}

export default Register