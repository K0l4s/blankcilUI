import React, { useState, useEffect } from 'react'
import Ava_name_banner from '../../components/ProfileComponents/ava_name_banner/Ava_name_banner';
import Icon_followers_likes_totalpodcasts from '../../components/ProfileComponents/icon_followers_likes_totalpodcasts/Icon_followers_likes_totalpodcasts';
import Self_description from '../../components/ProfileComponents/self_description/Self_description';
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
    return(
    <div className="Profile">
        {/* <Ava_name_banner/> */}
        {/* <Icon_followers_likes_totalpodcasts/> */}
        <Self_description/>
    </div>
  );
}

export default Profile_2