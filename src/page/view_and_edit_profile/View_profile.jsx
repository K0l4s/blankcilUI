
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { apiPath } from '../../api/endpoint';
import qs from 'qs';
import { toast, ToastContainer } from 'react-toastify';


import './View_profile.css';

const View_profile = () => {
    const avatarDefault = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';
    const navigate = useNavigate();
    const { id: userID } = useParams();
    console.log("id: " + userID);
    const [userData, setUserData] = useState(null);
    const [avatarURL, setAvatarURL] = useState(avatarDefault); 
    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [description, setDescription] = useState("");

  // const userID = window.location.href.split('/')[4];
  console.log("id: "+userID);
  // const [isLoading, setIsLoading] = useState(true);
  //let avatarURL = avatarDefault;
  useEffect(() => {
    if(userID == undefined){
      const token = localStorage.getItem('access_token');
      axios.get(apiPath+`users/profile`, {
        headers: {
          'ngrok-skip-browser-warning': 'any_value',
          'Authorization': `Bearer ${token}`
        }
      })
          .then(response => {
              if (response.data.status) {
                  setUserData(response.data.body);

                  setFullName(response.data.body.fullname);

                  setAddress(userData.address);
                  setEmail(userData.email);
                  setPhone(userData.phone);
                  setBirthday(userData.birthday);
                  setDescription(userData.description);
              } else {
                  console.error("Failed to get profile:", response.data.message);
              }
          })
          .catch(error => {
              console.error("Error getting profile:", error);
          });
    }else
    axios.get(apiPath+`users/profile/${userID}`, {
      headers: {
        'ngrok-skip-browser-warning': 'any_value'
      }
    })
        .then(response => {
            if (response.data.status) {
                setUserData(response.data.body);
            } else {
                console.error("Failed to get profile:", response.data.message);
            }
        })
        .catch(error => {
            console.error("Error getting profile:", error);
        }); 
}, []);

useEffect(() => {
    if (userData) {
        setFullName(userData.fullname);
        setAddress(userData.address);
        setBirthday(userData.birthday);
        setPhone(userData.phone);
    }
}, [userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({...prevState, [name]: value }));
    };

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleAvatarButtonClick = () =>{
        document.getElementById('avatarInput').click();
    }

    const handleAvatarChange = (e) =>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () =>{
            setAvatarURL(reader.result);// Lưu URL của ảnh vào state
        };
        reader.readAsDataURL(file);
        //xử lý file ảnh ở đây
    };

    const updateData = async () => {
        console.log("updateData called with userData:", userData, "and fullname:", fullname);
        if (!userData ||!fullname) {
            console.error("Missing required data for update.");
            return;
        }

        const newData = {
            "userID": userData.id,
            "fullname": fullname,
            "email": userData.email,
            "birthday": birthday,
            "address": address,
            "phone": phone,
            "description": description // Include description in update
        };

        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.put(apiPath + `users/profile/edit`, qs.stringify(newData), {
                headers: {
                    'ngrok-skip-browser-warning': 'any_value',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
                
            });
            console.log(response.data);
            toast.success("Update thành công", {
                position: "top-right",
                autoClose: 3000, // Tự động đóng sau 3 giây
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    backgroundColor: "green" // Đặt màu nền của toast thành màu xanh lá
                }
            });
            
            // Redirect or show success message after update
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Update bị lỗi", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    backgroundColor: "red" // Đặt màu nền của toast thành màu đỏ
                }
            });
        }
    };

    return (
        <div className="view-edit-profile">
            <h1>View and Edit Profile</h1>

            <div className="profile-photo">
                <div className="photo-container">
                    <img src={avatarURL} alt="Profile" />
                    <input type="file" id="avatarInput" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
                    <button className="change-photo" onClick={handleAvatarButtonClick}>Change Avatar</button>
                </div>
            </div>

            {userData && (
                <div className="form-group">
                    <div className="form-group-1">
                        <label>Introduce yourself</label>
                    </div>

                    <div className="form-group-2">
                        <label>Full name</label>
                        {/* <input type="text" name="fullname" value={userData.fullname} onChange={handleChange} /> */}
                        <input type="text" name="fullname" value={fullname} onChange={handleChange} />

                    </div>

                    <div className="form-group-3">
                        <label>Email</label>
                        <input type="text" name="email" value={userData.email} onChange={handleChange} disabled />
                    </div>

                    <div className="form-group-4">
                        <label>Address</label>
                        <input type="text" name="address" value={address} onChange={handleChange} />
                    </div>

                    <div className="form-group-5">
                        <label>Phone</label>
                        <input type="text" name="phone" value={phone} onChange={handleChange} />
                    </div>

                    <div className="form-group-6">
                        <label>Birthday</label>
                        <input type="text" name="birthday" value={birthday} onChange={handleChange} />
                    </div>

                    <div className="form-group-7">
                        <label>Description</label>
                        <input type="text" name="description" value={description} onChange={handleChangeDescription} />
                    </div>
                </div>
            )}
            <footer>
                <button onClick={updateData} className="save-button">Lưu</button>
            </footer>
            <ToastContainer />
        </div>
    );
}

export default View_profile;
