import React from 'react'
import './Leftbar.css'
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

const Leftbar = () => {
  const navigate = useNavigate();
  return (
    <div className='leftbar'>
        <div onClick={()=>navigate("/blankcilUI/profile")} className='item'>Profile</div>
        Feed
        <div className='item'><AiOutlineSearch/></div>
        <div className='item'><LuMessagesSquare/></div>
        <div className='item'><IoMdNotifications/></div>
        <div className='item'><FaRegBookmark/></div>
        <div>MORE</div>
    </div>
  )
}

export default Leftbar