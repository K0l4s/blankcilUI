import React, { useEffect } from 'react';
import './ConfirmRegister.css';
import { useNavigate, useParams } from 'react-router-dom';
import { apiPath } from '../../api/endpoint';
import axios from 'axios';

const ConfirmRegister = () => {
    const email = useParams().email;
    const navigate = useNavigate();

    // Xử lý logic cho pin-input
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
    // Lấy mã pin
    const handleConfirm = () => {
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
        // const token = localStorage.getItem('access_token');
        axios.get(apiPath + 'users/profile', {
            headers: {
                'ngrok-skip-browser-warning': 'any_value',
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status == '200') {
                localStorage.setItem('user', JSON.stringify(response.data.body));
                navigate('/');
                // console.log('User: '+localStorage.getItem('user'))
                // // Get user profile trả về json
                // const user = JSON.parse(localStorage.getItem('user'));
                // console.log('User: '+user.email)
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
            <h1>Xác minh người dùng</h1>
            <img src="https://i.pinimg.com/originals/f9/3d/62/f93d62043d1565e83d639464f7dc8608.png" alt="Logo" />
            <p>Vui lòng nhập mã xác nhận đã nhận gồm 06 chữ số qua email!</p>
            <div className="pin-input">
                <input type="text" maxLength="1" />
                <input type="text" maxLength="1" />
                <input type="text" maxLength="1" />
                <input type="text" maxLength="1" />
                <input type="text" maxLength="1" />
                <input type="text" maxLength="1" />
            </div>
            <p>Đây rồi, chỉ còn 01 bước nữa thôi!</p>
            <button onClick={handleConfirm}>Xác thực</button>
        </div>
    );
};

export default ConfirmRegister;
