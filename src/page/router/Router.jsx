import React, { useEffect } from 'react'
import './Router.css'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Home from '../home/Home'
import Navbar from '../../components/navbar/Navbar'
import Leftbar from '../../components/leftbar/Leftbar'
import Rightbar from '../../components/rightbar/Rightbar'
import i18next from 'i18next'
import Profile from '../profile/Profile'
import Login from '../login/Login'
import Register from '../register/Register'
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
    <div>
      {url.includes('login') || url.includes('register') ? <div></div> : <div>
      <Navbar />
      {/* Kiểm tra đường dẫn có chứa cụm từ profile hay không */}
      {url.includes('profile') ? <div></div> :
        <div>
          <Leftbar />
          <Rightbar />
        </div>}
        </div>}
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/*" element={<div>Không tìm thấy trang</div>} />
          
        </Routes>
      </div>
    </div>
  )
}

export default Router