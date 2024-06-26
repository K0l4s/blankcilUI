import React, { useEffect, useState } from 'react'
import './Profile.css'
import { useParams } from 'react-router-dom'
import { FaStarAndCrescent } from 'react-icons/fa'
import { SiPodcastindex } from 'react-icons/si'
import { SiGooglepodcasts } from 'react-icons/si'
import { TfiViewGrid } from 'react-icons/tfi'
import { CiGrid2H } from 'react-icons/ci'
import { BiCheckDouble } from 'react-icons/bi'
import PodcastPost from '../../components/post/podcastPost/PodcastPost'
import listPostCastTest from '../../access/listPodcastTest.json'
import axios from 'axios'
import { apiPath } from '../../api/endpoint'
import { toggleFollow,getProfile } from '../../api/user/user'
import PodcastBox from '../../components/profile/podcastBox/PodcastBox'
import { Tooltip } from '@chakra-ui/react'
const Profile = () => {
  const nickname = useParams().nickname;
  const [isFollow, setIsFollow] = useState(false);
  useEffect(() => {
    document.querySelector('aside').classList.add('minum');
    fetchData();
    

  }, [])
  const [profile, setProfile] = useState({});
  const fetchData = async() => {
    console.log('fetchData');
    getProfile(nickname).then((response) => {
      setProfile(response.data.body);
      setPodcasts(response.data.body.podcasts);
      setIsFollow(response.data.body.follow);
      document.title = response.data.body.fullname + ' (@' + nickname + ') - Podcloud';
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
  }
  
    window.scrollTo(0, 0);
  const [podcasts, setPodcasts] = useState(profile.podcasts? profile.podcasts : [{}]);
  return (
    <div className='profile-page'>
      <div className="profile-container">
        <div className="image-container">
          <div className="banner">
            <img src={
              profile.cover_url? profile.cover_url :
            "https://kinsta.com/wp-content/uploads/2021/11/what-is-a-podcast.jpg" 
            }
            alt="" />
          </div>
          <div className="avatar">
            <img src={
              profile.avatar_url? profile.avatar_url :
            "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
            }
             alt="" />
          </div>
          <div className="actionGroup">
          <button className="follow" onClick={()=>toggleFollow(setIsFollow, profile.id)}>
            {isFollow? <>Đã theo dõi<BiCheckDouble /></> : <>Theo dõi<SiGooglepodcasts /></>}
          </button>
          <button className="message">Nhắn tin</button>
        </div>
        </div>
        
        <div className="infor">
          <h1 className='name'>{profile.fullname} <SiPodcastindex /></h1>
          <p className="nickname">@{nickname}</p>
          <div className="badge"><FaStarAndCrescent/>NGÔI SAO ĐANG LÊN</div>
          <div className="detail-container">
            <div className="detail-item">{profile.podcasts? profile.podcasts.length : 0} Podcast</div>
            <div className="detail-item">{profile.followers} Follower</div>
            <div className="detail-item">{profile.following} Following</div>
          </div>
          {/* <h1>Chế độ hiển thị</h1> */}
          <div className="detail-container">
            <Tooltip label="Single" aria-label="A tooltip">
            <div className="detail-item"><TfiViewGrid /></div>
            </Tooltip>
            <Tooltip label="Playlist" aria-label="A tooltip">
            <div className="detail-item"><CiGrid2H/></div>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="podcasts-container">
      {podcasts.map((podcast, index) => (
          <PodcastBox
            index={index}
            podcast={podcast}
          />
        ))}
      </div>
    </div>
  )
}

export default Profile