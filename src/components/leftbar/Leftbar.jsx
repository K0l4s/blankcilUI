import React, { useEffect, useState } from 'react'
import './Leftbar.css'
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { RiVideoAddLine } from 'react-icons/ri';
import CreatePodcastModal from '../../modal/podcast/create/CreatePodcastModal';
import axios from 'axios';
import { apiPath } from '../../api/endpoint';

const Leftbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const handleOpenAdd = () => {
    if(!isOpenAdd)
      document.title="Create Podcast - Blankcil";
    else
      document.title="Blankcil";
    setIsOpenAdd(!isOpenAdd);
    console.log("open");
  }
  return (
    <div className='leftbar'>
      <div onClick={()=>navigate("/blankcilUI")} className='item'><img src="https://t4.ftcdn.net/jpg/02/90/67/89/360_F_290678971_Bk11xnoP5lQw4US7wCSId6jcKmWSfDBg.jpg" alt="" /><p>Home</p></div>
        {/* <div onClick={()=>navigate("/blankcilUI/profile")} className='item'><img src={avatar} alt="" /><p>Profile</p></div> */}
        
        <div className='item' onClick={()=>navigate("/blankcilUI/search")}><AiOutlineSearch/><p>Tìm kiếm</p></div>
        {/* <div className='item'><LuMessagesSquare/><p>Nhắn tin</p></div> */}
        {/* <div className='item'><IoMdNotifications/><p>Thông báo</p></div> */}
        {user? 
        <>
        <div className='item' onClick={handleOpenAdd}><RiVideoAddLine /><p>Thêm</p></div>
        {/* <div className='item'><FaRegBookmark/><p>Đã lưu</p></div> */}
        {/* <div>MORE</div> */}
        
        <CreatePodcastModal isOpen={isOpenAdd} onClose={handleOpenAdd}/></> : null}
    </div>
  )
}

export default Leftbar