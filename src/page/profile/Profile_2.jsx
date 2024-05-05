import React, { useState, useEffect } from 'react'
import Ava_name_banner from '../../components/ProfileComponents/ava_name_banner/Ava_name_banner';
import Icon_followers_likes_totalpodcasts from '../../components/ProfileComponents/icon_followers_likes_totalpodcasts/Icon_followers_likes_totalpodcasts';
import Self_description from '../../components/ProfileComponents/self_description/Self_description';
import Single_podcast from '../../components/ProfileComponents/personal_podcasts/Single_podcast';
// import AudioList from '../../components/AudioList';
// import axios from "axios";
// import { Button, Card, CircularProgress, useToast } from '@chakra-ui/react';
// import { FaUserPlus } from "react-icons/fa6";
// import { SiApplepodcasts } from "react-icons/si";
// import { FaHeadphones } from "react-icons/fa6";
// import { FaRegClock } from "react-icons/fa";
// import { FaHeart } from "react-icons/fa";
// import { FaRegHeart } from "react-icons/fa";
// import { AiFillLike } from "react-icons/ai";


const avatarDefault = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';


const Profile_2 = () => {
  const podcast = {
    image: "https://static.vecteezy.com/system/resources/previews/024/051/849/original/podcast-topic-rgb-color-icon-entertainment-platform-streaming-media-content-production-radio-show-themes-isolated-illustration-simple-filled-line-drawing-editable-stroke-vector.jpg",
    name: "First Podcast",
    // audioURL: "https://actions.google.com/sounds/v1/alarms/phone_alerts_and_rings.ogg"
    description:"Add your description"

  };

    return(
    <div className="Profile">
        {/* <Ava_name_banner/> */}
        {/* <Icon_followers_likes_totalpodcasts/> */}
        {/* <Self_description/> */}
        <h2 style={{ color: 'white' }}>First Podcast</h2>
        <Single_podcast
          image={podcast.image}
          name={podcast.name}
          description={podcast.description}
          // audioUrl={podcast.audioUrl}
        />
    </div>
  );
}

export default Profile_2