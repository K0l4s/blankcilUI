import React from 'react'
import './Rightbar.css'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLogin } from 'react-icons/ai';
import { RiFunctionAddLine, RiRegisteredFill } from 'react-icons/ri';
import { BiEditAlt, BiLogOut } from 'react-icons/bi';
import { IoWalkOutline } from 'react-icons/io5';
import { FaPersonWalkingArrowLoopLeft, FaPersonWalkingDashedLineArrowRight } from 'react-icons/fa6';
import { Si1001Tracklists } from 'react-icons/si';
import { FaUserEdit } from 'react-icons/fa';
import { MdOutlineLibraryAdd } from 'react-icons/md';
const Rightbar = () => {
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    window.location.reload();
  }
  const profile = JSON.parse(localStorage.getItem('user'));
  console.log(profile);
  let avatar = "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611750.jpg";
  if (profile && profile.avatar_url) {
    avatar = profile.avatar_url;
  }
  // const isLogin = localStorage.getItem('access_token');
  let isLogin = false;
  if (localStorage.getItem('access_token')) {
    isLogin = true;
  }
  const navigate = useNavigate();
  return (
    <div className='rightbar'>
      {!isLogin ? (
        <>
          <div className='item' onClick={() => navigate("/blankcilUI/login")}><FaPersonWalkingDashedLineArrowRight className='icon' /></div>
          <div className='item' onClick={() => navigate("/blankcilUI/register")}><MdOutlineLibraryAdd  className='icon' /></div>
        </>) :
        (
          <>
          <div className='item' onClick={() => navigate("/blankcilUI/profile")}><img src={avatar} alt="" /></div>
          {/* <p>{profile.fullname}</p> */}
          <div className='item' onClick={() => navigate("/blankcilUI/edit/profile")}><FaUserEdit  className='icon' /></div>
          <div className='item' onClick={logout}><FaPersonWalkingArrowLoopLeft  className='icon' /></div>
          </>
          )}

    </div>
  )
}

export default Rightbar