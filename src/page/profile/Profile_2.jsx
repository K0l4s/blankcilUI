import React, { useState, useEffect } from 'react'
import './Profile2.css'
import { useNavigate, useParams } from 'react-router-dom';

import Ava_name_banner from '../../components/ProfileComponents/ava_name_banner/Ava_name_banner';
import Icon_followers_likes_totalpodcasts from '../../components/ProfileComponents/icon_followers_likes_totalpodcasts/Icon_followers_likes_totalpodcasts';
import Self_description from '../../components/ProfileComponents/self_description/Self_description';
import Single_podcast from '../../components/ProfileComponents/personal_podcasts/Single_podcast';
import List_podcast from '../../components/ProfileComponents/personal_podcasts/List_podcast';
// import AudioList from '../../components/AudioList';
import axios from "axios";
// import { Button, Card, CircularProgress, useToast } from '@chakra-ui/react';
import { FaUserPlus } from "react-icons/fa6";
import { SiApplepodcasts } from "react-icons/si";
import { FaHeadphones } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { apiPath } from '../../api/endpoint';


const avatarDefault = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';


const Profile_2 = () => {
  // const podcast = {
  //   image: "https://static.vecteezy.com/system/resources/previews/024/051/849/original/podcast-topic-rgb-color-icon-entertainment-platform-streaming-media-content-production-radio-show-themes-isolated-illustration-simple-filled-line-drawing-editable-stroke-vector.jpg",
  //   name: "First Podcast",
  //   // audioURL: "https://actions.google.com/sounds/v1/alarms/phone_alerts_and_rings.ogg"
  //   description:"Add your description"
  // };

  const avatarDefault = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';

  const user = {
    banner: 'https://www.shutterstock.com/shutterstock/videos/1075861385/thumb/1.jpg?ip=x480',
    profile: 'https://img.freepik.com/vector-premium/microfono-podcast-banner-podcast-concepto-diseno-plano-ilustracion-vectorial_476325-514.jpg',
    title: 'Ngôi sao đang lên',
    fullname: 'John Dashin',
    username: 'johndashin'
  }

    // Giả sử bạn có một mảng chứa thông tin các podcast cá nhân
  //   const personalPodcasts = [
  //     {
  //       image: "https://static.vecteezy.com/system/resources/previews/024/051/849/original/podcast-topic-rgb-color-icon-entertainment-platform-streaming-media-content-production-radio-show-themes-isolated-illustration-simple-filled-line-drawing-editable-stroke-vector.jpg",
  //       name: "First Podcast",
  //       description:"Add your description"
  //     },
  //     {
  //       image: "https://static.vecteezy.com/system/resources/previews/024/051/849/original/podcast-topic-rgb-color-icon-entertainment-platform-streaming-media-content-production-radio-show-themes-isolated-illustration-simple-filled-line-drawing-editable-stroke-vector.jpg",
  //       name: "First Podcast",
  //       description:"Add your description"
  //     },
  //     {
  //       image: "https://static.vecteezy.com/system/resources/previews/024/051/849/original/podcast-topic-rgb-color-icon-entertainment-platform-streaming-media-content-production-radio-show-themes-isolated-illustration-simple-filled-line-drawing-editable-stroke-vector.jpg",
  //       name: "First Podcast",
  //       description:"Add your description"
  //     },
  //     {
  //       image: "https://static.vecteezy.com/system/resources/previews/024/051/849/original/podcast-topic-rgb-color-icon-entertainment-platform-streaming-media-content-production-radio-show-themes-isolated-illustration-simple-filled-line-drawing-editable-stroke-vector.jpg",
  //       name: "First Podcast",
  //       description:"Add your description"
  //     },
  //     {
  //       image: "https://static.vecteezy.com/system/resources/previews/024/051/849/original/podcast-topic-rgb-color-icon-entertainment-platform-streaming-media-content-production-radio-show-themes-isolated-illustration-simple-filled-line-drawing-editable-stroke-vector.jpg",
  //       name: "First Podcast",
  //       description:"Add your description"
  //     },
  //     {
  //       image: "https://static.vecteezy.com/system/resources/previews/024/051/849/original/podcast-topic-rgb-color-icon-entertainment-platform-streaming-media-content-production-radio-show-themes-isolated-illustration-simple-filled-line-drawing-editable-stroke-vector.jpg",
  //       name: "First Podcast",
  //       description:"Add your description"
  //     },
      
  // ];

  // const userInfo ={
  //   fullname: 'John Dashin',
  //   birthday: 'January 1, 1990',
  //   hometown: 'New York',
  //   occupation: 'Software Engineer',
  //   gender: 'Male'
  // };
  
  const navigate = useNavigate();
  // const userID = window.location.href.split('/')[4];
  const userID = useParams().id;
  console.log("id: "+userID);
  const [userData, setUserData] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  let avatarURL = avatarDefault;
  useEffect(() => {
    axios.get(apiPath+`users/profile/${userID}`, {
      headers: {
        'ngrok-skip-browser-warning': 'any_value'
      }
    })
        .then(response => {
            if (response.data.status) {
                setUserData(response.data.body);
                //setIsLoading(false);
            } else {
                console.error("Failed to get profile:", response.data.message);
            }
        })
        .catch(error => {
            console.error("Error getting profile:", error);
        }); 
}, []);

  

    return(
    <div className="Profile">
      <div className="bannerAndProfile">

        <div className="banner">
          <img src={user.banner} alt="banner" />
        </div>

        <div className="profile">

          <img src={user.profile} alt="profile" />

          {userData && (
            <div className="information">
              <p className='title'>{user.title}</p>
              <div className="fullnameAndUsername">
                <p className="fullname">{userData.fullname}</p>
                {/* <p className="username">@{user.username}</p> */}
              </div>
            </div>
        )}
          <div className="button">
                <button className="editProfileButton" onClick={()=>navigate("/blankcilUI/view_edit_profile")}>View and Edit Profile</button>
          </div>
          
        </div>

        <div className="icons">
            <div className="followers">
                <FaUserPlus/>
                <span>123K</span>
            </div>

            <div className="totalPodcasts">
                <SiApplepodcasts/>
                <span>{userData?.podcasts?.length} podcasts</span>
            </div> 

            <div className="likes">
                <AiFillLike/>
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
     
        {/* <Ava_name_banner/> */}

        {/* <Icon_followers_likes_totalpodcasts/> */}

        {/* <Self_description/> */}
        {/* <h2 style={{ color: 'white' }}>First Podcast</h2>
        <Single_podcast
          image={podcast.image}
          name={podcast.name}
          description={podcast.description}
          // audioUrl={podcast.audioUrl}
        /> */}
    </div>
  );
}

export default Profile_2