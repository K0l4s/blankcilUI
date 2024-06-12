import React, { useEffect, useState } from 'react';
import './CodeRequest.css';
import { useNavigate, useParams } from 'react-router-dom';
import { apiPath } from '../../api/endpoint';
import axios from 'axios';

const CodeRequest = ({pageName}) => {
    const email = useParams().email;
    const navigate = useNavigate();
    const [time, setTime] = useState(5);
    const handlePinInput = () => {
        const inputs = document.querySelectorAll('.pin-input input');
        inputs.forEach((input, index) => {
            input.addEventListener('keydown', (e) => {
                if (e.key >= 0 && e.key <= 9) {
                    inputs[index].value = '';
                    setTimeout(() => {
                        if (index < inputs.length - 1) {
                            inputs[index + 1].focus();
                        }
                    }, 10);
                } else if (e.key === 'Backspace') {
                    setTimeout(() => {
                        if (index > 0) {
                            inputs[index - 1].focus();
                        }
                    }, 10);
                }
            });
        });
    };

    useEffect(() => {
        handlePinInput();
    }, []);
    // auto decrease time
    useEffect(() => {
        const timer = setTimeout(() => {
            if (time > 0) {
                setTime(time - 1);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [time]);

    // Lấy mã pin
    const confirmEmail = () => {
        const inputs = document.querySelectorAll('.pin-input input');
        let pin = '';
        inputs.forEach((input) => {
            pin += input.value;
        });
        console.log(pin);
        const data = {
            email: email,
            code: pin,
        };

        // Fetch API để xác thực mã pin
        fetch(apiPath + 'auth/confirm-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                fetchUserProfileByToken(data.access_token);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const fetchUserProfileByToken = async (token) => {
        axios.get(apiPath + 'users/profile', {
            headers: {
                'ngrok-skip-browser-warning': 'any_value',
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status == '200') {
                localStorage.setItem('user', JSON.stringify(response.data.body));
                navigate('/');
            }
            console.log(response.data);
        }
        ).catch((error) => {
            console.error('Error:', error);
        });
    };
    return (
        <div className='confirm'>
            {/* Pin input */}
            {pageName === 'confirmEmail' &&
            <h1>Xác minh người dùng</h1>}
            {pageName === 'resetPassword' &&
            <h1>Quên mật khẩu</h1>}
            <img src="https://i.pinimg.com/originals/f9/3d/62/f93d62043d1565e83d639464f7dc8608.png" alt="Logo" />
            <p>Vui lòng nhập mã xác nhận đã nhận gồm 06 chữ số qua email!</p>
            {pageName === 'resetPassword' &&
            <form action="">
            <input type = "email" placeholder="Nhập email của bạn" />
            <button type='submit'>Gửi mã xác nhận</button>
            </form>}
            <div className="pin-input">
                <input type="text" maxLength="1" />
                <input type="text" maxLength="1" />
                <input type="text" maxLength="1" />
                <input type="text" maxLength="1" />
                <input type="text" maxLength="1" />
                <input type="text" maxLength="1" />
            </div>
            <p>Đây rồi, chỉ còn 01 bước nữa thôi!</p>
            {pageName === 'confirmEmail' &&
            <button onClick={confirmEmail}>Xác thực</button>}
            <p>Chưa nhận được mã xác minh?</p>
            <p>Chờ {time}s</p>
            <button disabled={time !== 0} onClick={() => setTime(5)}>Gửi lại mã xác minh</button>
        </div>
    );
};

export default CodeRequest;
