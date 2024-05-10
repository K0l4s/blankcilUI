import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

// import { useHistory } from "react-router-dom"
import './View_profile.css';

const View_profile = () => {
    // const history = useHistory();

    // const handleEditClick = () =>{
    //     history.push("/edit_profile");
    // };

    const avatarDefault = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';
    const userID = window.location.href.split('/')[4];
    const currentLoginID = localStorage.getItem("userID");
    const [userData, setUserData] = useState(null);
    let avatarURL = avatarDefault;
    useEffect(() => {
        axios.get('http://localhost:9090/api/v1/users/profile/5')
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

    const [profile, setProfile] = useState({
        // photo: 'https://i.pinimg.com/736x/4b/c8/b1/4bc8b13f461f1f770723031142c18f4c.jpg',
        // fullname: 'Lalisa Monoban',
        // email: 'lisa.mono123@gmail.com',
        description: 'Describe yourself'
        // birthday: '2024-05-04',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...userData, [name]: value });
    };

    const handleChange_1 = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    return (
        <div className="view-edit-profile">
            <h1>View and Edit Profile</h1>

            <div className="profile-photo">
                <div className="photo-container">
                    <img src={avatarDefault} alt="Profile" />
                    <button className="change-photo">Change Avatar</button>
                </div>
            </div>

            {userData && (
                <div className="form-group">
                    <div className="form-group-1">
                        <label>Introduce yourself</label>
                    </div>

                    <div className="form-group-2">
                        <label>Full name</label>
                        <input type="text" name="fullname" value={userData.fullname} onChange={handleChange} />
                    </div>

                    <div className="form-group-3">
                        <label>Address</label>
                        <input type="text" name="address" value={userData.address} onChange={handleChange} />
                    </div>

                    <div className="form-group-4">
                        <label>Phone</label>
                        <input type="text" name="phone" value={userData.phone} onChange={handleChange} />
                    </div>

                    <div className="form-group-5">
                        <label>Birthday</label>
                        <input type="text" name="birthday" value={userData.birthday} onChange={handleChange} />
                    </div>

                    <div className="form-group-6">
                        <label>Description</label>
                        <input type="text" name="description" value={profile.description} onChange={handleChange_1} />
                    </div>

                </div>
            )}
            <footer>
                <button className="save-button">Lưu</button>
            </footer>
        </div>
    );
}

export default View_profile;