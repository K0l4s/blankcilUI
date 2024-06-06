import React, { useEffect } from 'react'
import './Router.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from '../home/Home'
import Leftbar from '../../components/leftbar/Leftbar'
import i18next from 'i18next'
import Login from '../login/Login'
import Register from '../register/Register'
import Search from '../search/Search'
import View_profile from '../view_and_edit_profile/View_profile'
import NotFoundPage from '../404Page/NotFoundPage'
import PodcastPage from '../podcastPage/PodcastPage'
import ConfirmRegister from '../confim-register/ConfirmRegister'
import Navbar from '../../components/navbar/Navbar'
import SettingPage from '../setting/SettingPage'
// import ChatRoom from '../chat/ChatRoom'
const Router = () => {
  const url = window.location.href;
  const navigate = useNavigate();
  const changeLangByUrl = useEffect(() => {
    if (url.includes('vi')) {
      i18next.changeLanguage('vi')
      localStorage.setItem('i18nextLng', 'vi')
    } else {
      i18next.changeLanguage('en')
      localStorage.setItem('i18nextLng', 'en')
    }
  }
  )
  return (
    <div className='router'>
      {url.includes('login') || url.includes('register') ? <div></div> : <div>
      {/* Kiểm tra đường dẫn có chứa cụm từ profile hay không */}
      {/* {url.includes('profile') ? <div></div> : */}
        <div>
          <Leftbar />
          <Navbar />
          {/* <Rightbar /> */}
        </div>
        {/* } */}
        </div>}
        <div className="mainContent">
          {/* <div id="heart"></div> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/blankcilUI/profile" element={<Profile/>} /> */}
          {/* <Route path= "/profile/:id" element={<Profile_2/>}/> */}
          {/* <Route path= "/profile" element={<Profile_2/>}/> */}
          <Route path="/podcast/:id" element={<PodcastPage />} />

          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path='/confirm/register/:email' element={<ConfirmRegister/>}/>

          <Route path="/search" element={<Search/>} />
          {/* <Route path="/blankcilUI/search/:search" element={<Search/>} /> */}
          {/* Edit route */}
          <Route path= "/edit/profile" element={<View_profile/>}/>
          {/* <Route path='/chat' element={<ChatRoom/>} /> */}
          <Route path="/edit/password" element={<Search/>} />\
          <Route path="/setting" element={<SettingPage/>} />
          <Route path="/*" element={<NotFoundPage/>} />
        </Routes>
        </div>
    </div>
  )
}

export default Router