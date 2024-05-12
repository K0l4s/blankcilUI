import React from 'react'
import './Rightbar.css'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLogin } from 'react-icons/ai';
import { RiRegisteredFill } from 'react-icons/ri';
import { BiEditAlt, BiLogOut } from 'react-icons/bi';
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
          <div className='item' onClick={() => navigate("/blankcilUI/login")}><AiOutlineLogin className='icon' /></div>
          <div className='item' onClick={() => navigate("/blankcilUI/register")}><RiRegisteredFill className='icon' /></div>
        </>) :
        (
          <>
          <div className='item' onClick={() => navigate("/blankcilUI/profile")}><img src={avatar} alt="" /></div>
          <p>{profile.fullname}</p>
          <div className='item' onClick={() => navigate("/blankcilUI/edit/profile")}><BiEditAlt className='icon' /></div>
          <div className='item' onClick={logout}><BiLogOut className='icon' /></div>
          </>
          )}

    </div>
  )
}

export default Rightbar