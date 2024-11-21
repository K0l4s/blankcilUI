
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { apiPath } from '../../api/endpoint';
import qs from 'qs';


import './SettingPage.css';
import { useToast } from '@chakra-ui/react';

const SettingPage = () => {
    const [avatarURL, setAvatarURL] = useState('https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png');
    const [bannerURL,setBannerURL] = useState('https://www.shutterstock.com/shutterstock/videos/1075861385/thumb/1.jpg?ip=x480');
    const toast = useToast();
    const avatarDefault = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        axios.get(apiPath + `users/profile`, {
            headers: {
                'ngrok-skip-browser-warning': 'any_value',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.data.status) {
                    document.getElementById('fullname').value = response.data.body.fullname?response.data.body.fullname:null;
                    document.getElementById('address').value = response.data.body.address?response.data.body.address:null;
                    document.getElementById('email').value = response.data.body.email?response.data.body.email:null;
                    document.getElementById('phone').value = response.data.body.phone?response.data.body.phone:null;
                    document.getElementById('date').value = response.data.body.birthday?response.data.body.birthday:null;
                    document.getElementById('profileImage').src = response.data.body.avatar_url?response.data.body.avatar_url:avatarDefault;
                    document.getElementById('bannerImage').src = response.data.body.cover_url?response.data.body.cover_url:bannerURL;
                } else {
                    console.error("Failed to get profile:", response.data.message);
                }
            })
            .catch(error => {
                console.error("Error getting profile:", error);
            });

    }, []);


    const handleAvatarChange = () => {
        document.getElementById('avatarInput').click();
        // Thay ảnh avatar khi chọn ảnh mới
        document.getElementById('avatarInput').addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file instanceof Blob) { // Kiểm tra xem file có phải là một đối tượng Blob không
                const reader = new FileReader();
                reader.onload = function () {
                    setAvatarURL(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                console.error('Invalid file:', file);
            }
        });
    }
    

    const updateData = async () => {
        const fullname = document.getElementById('fullname').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const birthday = document.getElementById('date').value;
        const token = localStorage.getItem('access_token');
        const formData = new FormData();
        formData.append('fullname', fullname);
        formData.append('address', address);
        formData.append('phone', phone);
        formData.append('birthday', birthday);
        // if (document.getElementById('avatarInput').files[0]){
        //     console.log('avatar changed');
        //     formData.append('avatarImage', document.getElementById('avatarInput').files[0]);}
        const file = document.getElementById('avatarInput').files[0];
        if (file != null || file !=undefined) {
            formData.append('avatarImage', file);
        }
        console.log('formData:', formData);
        axios.put(apiPath + `users/profile/edit`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            console.log(response.data);
            localStorage.setItem('user', JSON.stringify(response.data.body));
            toast({
                title: "Cập nhật thành công!",
                description: "Thông tin của bạn đã được cập nhật",
                status: "success",
                duration: 9000,
                isClosable: true,
            })
        }
        ).catch((error) => {
            console.error('Error:', error);
            toast({
                title: "Lỗi",
                description: "Cập nhật thông tin thất bại",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        });

    };

    return (
        <div className="view-edit-profile">
            <h1>View and Edit Profile</h1>
            {/* <div className="banner">
                <img id="bannerImage" src={bannerURL} alt="" />
            </div> */}
            <div className="profile-photo">
                <div className="photo-container">
                    <img id='profileImage' onClick={handleAvatarChange} src={avatarURL} alt="Profile" />
                    <input type="file" id="avatarInput" accept="image/*" 
                    // style={{ display: 'none' }}
                     />
                    {/* <button className="change-photo" onClick={handleAvatarButtonClick}>Change Avatar</button> */}
                </div>
            </div>

                <div className="form-group">
                    <div className="form-group-1">
                        <label>Introduce yourself</label>
                    </div>

                    <div className="form-group-2">
                        <label>Full name</label>
                        {/* <input type="text" name="fullname" value={userData.fullname} onChange={handleChange} /> */}
                        <input id='fullname' type="text" name="fullname" />

                    </div>

                    <div className="form-group-3">
                        <label>Email</label>
                        <input id='email' type="text" name="email" disabled />
                    </div>

                    <div className="form-group-4">
                        <label>Address</label>
                        <input id='address' type="text" name="address" />
                    </div>

                    <div className="form-group-5">
                        <label>Phone</label>
                        <input id='phone' type="text" name="phone" />
                    </div>

                    <div className="form-group-6">
                        <label>Birthday</label>
                        <input id='date' type="date" name="birthday" />
                    </div>
                </div>

            <footer>
                <button onClick={updateData} className="save-button">Lưu</button>
            </footer>
            {/* <ToastContainer /> */}
        </div>
    );
}

export default SettingPage;