import React, { useEffect, useState } from 'react'
import './Profile.css'
import { useParams } from 'react-router-dom'
import { FaStarAndCrescent } from 'react-icons/fa'
import { SiPodcastindex } from 'react-icons/si'
import { SiGooglepodcasts } from 'react-icons/si'
import { TfiViewGrid } from 'react-icons/tfi'
import { CiGrid2H } from 'react-icons/ci'
import PodcastPost from '../../components/post/podcastPost/PodcastPost'
import listPostCastTest from '../../access/listPodcastTest.json'
import axios from 'axios'
import { apiPath } from '../../api/endpoint'
const Profile = () => {
  const nickname = useParams().nickname;
  
  useEffect(() => {
    document.querySelector('aside').classList.add('minum');
    fetchData();
    
  }, [])
  const [profile, setProfile] = useState({});
  const fetchData = async() => {
    console.log('fetchData');
    axios.get(apiPath+`users/profile/${nickname}`)
    .then((response) => {
      setProfile(response.data.body);
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
  }
  const [podcasts, setPodcasts] = useState(listPostCastTest);
  return (
    <div className='profile-page'>
      <div className="profile-container">
        <div className="image-container">
          <div className="banner">
            <img src="https://kinsta.com/wp-content/uploads/2021/11/what-is-a-podcast.jpg" alt="" />
          </div>
          <div className="avatar">
            <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" alt="" />
          </div>
          <div className="actionGroup">
          <button className="follow">Theo dõi<SiGooglepodcasts /></button>
          <button className="message">Nhắn tin</button>
        </div>
        </div>
        
        <div className="infor">
          <h1 className='name'>{profile.fullname} <SiPodcastindex /></h1>
          <p className="nickname">@{nickname}</p>
          <div className="badge"><FaStarAndCrescent/>NGÔI SAO ĐANG LÊN</div>
          <div className="detail-container">
            <div className="detail-item">{profile.podcasts.length} Podcast</div>
            <div className="detail-item">5 Follower</div>
            <div className="detail-item">5 Following</div>
          </div>
          <h1>Chế độ hiển thị</h1>
          <div className="detail-container">
            <div className="detail-item"><TfiViewGrid /></div>
            <div className="detail-item"><CiGrid2H/></div>
          </div>
        </div>
      </div>
      <div className="podcasts-container">
      {podcasts.map((podcast, index) => (
          <PodcastPost
            key={index}
            index={index}
            podcast={podcast}
          />
        ))}
      </div>
    </div>
  )
}

export default Profile