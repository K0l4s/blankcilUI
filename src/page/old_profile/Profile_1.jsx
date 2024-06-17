import React, { useState, useEffect } from 'react'
import './Profile.css'
import AudioList from '../../components/AudioList';
import axios from "axios";
import { Button, Card, CircularProgress, useToast } from '@chakra-ui/react';
import { FaUserPlus } from "react-icons/fa6";
import { SiApplepodcasts } from "react-icons/si";
import { FaHeadphones } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const avatarDefault = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';


const Profile_1 = () => {
  const user = {
    banner: 'https://www.shutterstock.com/shutterstock/videos/1075861385/thumb/1.jpg?ip=x480',
    profile: 'https://img.freepik.com/vector-premium/microfono-podcast-banner-podcast-concepto-diseno-plano-ilustracion-vectorial_476325-514.jpg',
    title: 'Ngôi sao đang lên',
    fullname: 'John Dashin',
    username: 'johndashin'
  }

  // const id = window.location.href.split('/')[4];
  const id = 2;
  const currentLoginID = localStorage.getItem("id");
  const[userData, setUserData] = useState(null);
  let avatarURL = avatarDefault;
  useEffect(() =>{
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    };
      axios.get('http://localhost:9090/api/v1/users/profile')
          .then(response =>{
            console.log(response.data.body)
            setUserData(response.data.body)
            // setUserData({
            //   "id": response.data.id,
            //   "fullname": response.data.fullname,
            //   "email": response.data.email,
            //   "birthday": response.data.birthday,
            //   "address": response.data.address,
            //   "phone": response.data.phone,
            // });
            console.log(userData);
          })
          .catch(error => {
            console.error(error);
          })
  }, [id]);
// const userInfo ={
//   fullname: 'John Dashin',
//   birthday: 'January 1, 1990',
//   hometown: 'New York',
//   occupation: 'Software Engineer',
//   gender: 'Male'
// };

  // const podcasts = [
  //   { title: 'Podcast 1', url: 'https://open.spotify.com/track/2TT6ef6PcwZ5bPxDpFCUhR?si=5d092fbdebda44d9', image: 'https://caodang.fpt.edu.vn/wp-content/uploads/98.jpg' },
  //   { title: 'Podcast 2', url: 'https://open.spotify.com/track/4egwKPow9aLm5BYYXqcieq?si=40f0e5aa1adc450c', image: 'https://caodang.fpt.edu.vn/wp-content/uploads/98.jpg' },
  //   { title: 'Podcast 3', url: 'https://open.spotify.com/track/77Pm4sSI00ewJ4yVVXD0Dr?si=6c8861aa5dba44ef', image: 'https://caodang.fpt.edu.vn/wp-content/uploads/98.jpg' },
  //   { title: 'Podcast 4', url: 'https://open.spotify.com/track/3Vk4MI7LczZ1pMHGOGTNfB?si=8be775da7eff4fa7', image: 'https://caodang.fpt.edu.vn/wp-content/uploads/98.jpg' }
  //   // Thêm thêm podcasts nếu cần
  //  ];

 

  return (
    <div className='profile'>
      <div className="bannerAndProfile">

          <div className="banner">
            <img src={user.banner} alt="banner" />
          </div>

          <div className="profile">
            <img src={user.profile} alt="profile" />
            <div className="information">

              <p className='title'>{user.title}</p>
              <div className="fullnameAndUsername">
              <p className="fullname">{user.fullname}</p>
              <p className="username">@{user.username}</p>
              </div>

              {/* <div>Test
                {userData.map((data) => {
                  return (
                    <div>{data.name}</div>
                  )
                })}
              </div> */}

              <div className="userDetailed">
                <div className="infoBlock">
                <div className="fullname">
                <p><strong>Full Name: </strong>{userData ? userData.fullname : ''}</p>
                    {/* <p><strong>Full name: </strong></p>
                    {userData && userData.birthday ? (
                      <div>{userData.fullname}</div>
                    ) : (
                      <div>null</div>
                    )} */}
              </div>
              </div>
              <div className="infoBlock">
                <div className="email">
                  <p><strong>Email: </strong>{userData ? userData.email : ''}</p>
                </div>
              </div>
              <div className="infoBlock">
                <div className="birthday">
                  <p><strong>Birthday: </strong>{userData ? userData.birthday : ''}</p>
                </div>
              </div>
              <div className="infoBlock">
                <div className="address">
                  <p><strong>Address: </strong>{userData ? userData.address : ''}</p>
                </div>
              </div>
              <div className="infoBlock">
                <div className="phone">
                  <p><strong>Phone: </strong>{userData ? userData.phone : ''}</p>
                </div>
              </div>
            </div>

            </div>

            <div className="buttons">
              {/* <button className="viewProfileButton">View Profile</button> */}
              <button className="editProfileButton">Edit & Update Profile</button>
            </div>
            
          </div>

          
            <div className="icons">
                <div className="followers">
                  <FaUserPlus/>
                  <span>123K</span>
                </div>
                
                <div className="totalPodcasts">
                  <SiApplepodcasts/>
                  <span>52 podcasts</span>
                </div>
          </div>

            <AudioList />
        </div>

          

          

         {/* <div className="podcasts">
          {podcasts.slice(0,5).map((podcast, index) => (
            <div key={index} className="podcast-item">
              <img src={podcast.image} alt={podcast.title} className="podcast-image" />
              <div className="podcast-info">
                <a href={podcast.url} target="_blank" rel="noopener noreferrer" className="podcast-title">
                  {podcast.title}
                </a>
                <button className="play-button">Play</button>
              </div>
            </div>
          ))}

         </div> */}

      

    </div>
  )
}

export default Profile_1