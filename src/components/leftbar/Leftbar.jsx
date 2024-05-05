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
        <div onClick={()=>navigate("/blankcilUI/profile")} className='item'><img src="https://t4.ftcdn.net/jpg/02/90/67/89/360_F_290678971_Bk11xnoP5lQw4US7wCSId6jcKmWSfDBg.jpg" alt="" /><p>Profile</p></div>
        
        <div className='item'><AiOutlineSearch/><p>Tìm kiếm</p></div>
        <div className='item'><LuMessagesSquare/><p>Nhắn tin</p></div>
        <div className='item'><IoMdNotifications/><p>Thông báo</p></div>
        <div className='item'><FaRegBookmark/><p>Đã lưu</p></div>
        <div>MORE</div>
    </div>
  )
}

export default Leftbar