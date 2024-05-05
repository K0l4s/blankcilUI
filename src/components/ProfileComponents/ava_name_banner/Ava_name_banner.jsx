import React, { useState, useEffect } from 'react'
import './Ava_name_banner.css'

const avatarDefault = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';

const Ava_name_banner = () => {
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
            </div>
         
          </div>
        </div>
    </div>
  )
}

export default Ava_name_banner