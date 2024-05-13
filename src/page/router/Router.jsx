import React, { useEffect } from 'react'
import './Router.css'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Home from '../home/Home'
import Navbar from '../../components/navbar/Navbar'
import Leftbar from '../../components/leftbar/Leftbar'
import Rightbar from '../../components/rightbar/Rightbar'
import i18next from 'i18next'
// import Profile from '../profile/Profile'
import Profile_2 from '../profile/Profile_2'
import Login from '../login/Login'
import Register from '../register/Register'
import { RiVideoAddLine } from "react-icons/ri";
import Search from '../search/Search'
import View_profile from '../view_and_edit_profile/View_profile'
import NotFoundPage from '../404Page/NotFoundPage'
import PodcastPage from '../podcastPage/PodcastPage'
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
      {/* <Navbar /> */}
      {/* Kiểm tra đường dẫn có chứa cụm từ profile hay không */}
      {/* {url.includes('profile') ? <div></div> : */}
        <div>
          <Leftbar />
          <Rightbar />
        </div>
        {/* } */}
        </div>}
      <div className="main">
        <Routes>
          <Route path="/blankcilUI" element={<Home />} />
          <Route path="/blankcilUI/home" element={<Home />} />
          {/* <Route path="/blankcilUI/profile" element={<Profile/>} /> */}
          <Route path= "/blankcilUI/profile/:id" element={<Profile_2/>}/>
          <Route path= "/blankcilUI/profile" element={<Profile_2/>}/>
          <Route path="/blankcilUI/podcast/:id" element={<PodcastPage />} />

          <Route path="/blankcilUI/login" element={<Login/>} />
          <Route path="/blankcilUI/register" element={<Register/>} />

          <Route path="/blankcilUI/search" element={<Search/>} />
          {/* <Route path="/blankcilUI/search/:search" element={<Search/>} /> */}
          {/* Edit route */}
          <Route path= "/blankcilUI/edit/profile" element={<View_profile/>}/>
          <Route path="/blankcilUI/edit/password" element={<Search/>} />
          <Route path="/*" element={<NotFoundPage/>} />
          
        </Routes>
      </div>
      {/* <div className="createPost"><RiVideoAddLine size={50}/></div> */}
    </div>
  )
}

export default Router