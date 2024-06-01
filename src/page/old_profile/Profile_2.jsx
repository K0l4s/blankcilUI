import React, { useState, useEffect } from 'react';
import './Profile2.css';
import { useNavigate, useParams } from 'react-router-dom';
import List_podcast from '../../components/ProfileComponents/personal_podcasts/List_podcast';
import axios from "axios";
import { FaUserPlus } from "react-icons/fa6";
import { SiApplepodcasts } from "react-icons/si";
import { AiFillLike } from "react-icons/ai";
import { apiPath } from '../../api/endpoint';

const Profile_2 = () => {
  const avatarDefault = "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611750.jpg";
  const user = {
    banner: 'https://www.shutterstock.com/shutterstock/videos/1075861385/thumb/1.jpg?ip=x480',
    title: 'Ngôi sao đang lên',
    fullname: 'John Dashin',
    username: 'johndashin'
  };

  const [avatarURL, setAvatarURL] = useState(avatarDefault);
  const navigate = useNavigate();
  const { id: userID } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(userID ? `${apiPath}users/profile/${userID}` : `${apiPath}users/profile`, {
          headers: userID ? { 'ngrok-skip-browser-warning': 'any_value' } : {
            'ngrok-skip-browser-warning': 'any_value',
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data.status) {
          console.log("User data fetched:", response.data.body);
          setUserData(response.data.body);
          if (response.data.body.avatar_url) setAvatarURL(response.data.body.avatar_url);
        } else {
          console.error("Failed to get profile:", response.data.message);
        }
      } catch (error) {
        console.error("Error getting profile:", error);
      }
    };
    
    fetchUserProfile();
  }, [userID]);

  useEffect(() => {
    if (userData) {
      console.log("Podcasts data:", userData.podcasts);
    }
  }, [userData]);

  return (
    <div className="Profile">
      <div className="bannerAndProfile">
        <div className="banner">
          <img src={user.banner} alt="banner" />
        </div>

        <div className="profile">
          <img src={avatarURL} alt="profile" />

          {userData && (
            <div className="information">
              <p className='title'>{user.title}</p>
              <div className="fullnameAndUsername">
                <p className="fullname">{userData.fullname}</p>
              </div>
            </div>
          )}
        </div>

        <div className="icons">
          <div className="followers">
            <FaUserPlus />
            <span>123K</span>
          </div>

          <div className="totalPodcasts">
            <SiApplepodcasts />
            <span>{userData?.podcasts?.length} podcasts</span>
          </div>

          <div className="likes">
            <AiFillLike />
            <span>100K Likes</span>
          </div>
        </div>

        <div className="description">
          <p>Update your profile to add the description</p>
        </div>

        <div className="podcasts">
          <h1>Your Personal Podcasts</h1>
          <List_podcast podcasts={userData?.podcasts || []} />
        </div>
      </div>
    </div>
  );
}

export default Profile_2;
