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


const Profile = () => {
  const user = {
    banner: 'https://www.shutterstock.com/shutterstock/videos/1075861385/thumb/1.jpg?ip=x480',
    profile: 'https://img.freepik.com/vector-premium/microfono-podcast-banner-podcast-concepto-diseno-plano-ilustracion-vectorial_476325-514.jpg',
    title: 'Ngôi sao đang lên',
    fullname: 'John Dashin',
    username: 'johndashin'
  }

const userInfo ={
  fullname: 'John Dashin',
  birthday: 'January 1, 1990',
  hometown: 'New York',
  occupation: 'Software Engineer',
  gender: 'Male'
};

 

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

              <div className="userDetailed">
              <div className="infoBlock">
                <div className="fullname">
                  <p><strong>Full Name: </strong>{userInfo.fullname}</p>
                </div>
              </div>
              <div className="infoBlock">
                <div className="birthday">
                  <p><strong>Birthday: </strong>{userInfo.birthday}</p>
                </div>
              </div>
              <div className="infoBlock">
                <div className="hometown">
                  <p><strong>Hometown: </strong>{userInfo.hometown}</p>
                </div>
              </div>
              <div className="infoBlock">
                <div className="occupation">
                  <p><strong>Occupation: </strong>{userInfo.occupation}</p>
                </div>
              </div>
              <div className="infoBlock">
                <div className="gender">
                  <p><strong>Gender: </strong>{userInfo.gender}</p>
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

export default Profile