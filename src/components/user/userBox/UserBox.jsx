import React from 'react'
import './UserBox.css'
import { RiHeartAdd2Line } from "react-icons/ri";
import { FaEye } from "react-icons/fa6";
import { useSelector } from 'react-redux';

const UserBox = () => {
  const theme = useSelector(state => state.themeMode.theme);
  return (
    <div className={'userItem '+theme}>
      <div className="av">
        <img className='frame' src="https://i.pinimg.com/originals/d2/b4/4b/d2b44b04b158a921a9849024b5d41411.gif" alt="frame" />
        <img src="https://i.pinimg.com/originals/ae/6a/a7/ae6aa72214818e8cc2dceb096857e36a.gif" alt="avatar" />
      </div>
      <div className="info">
      <div className="detail">
        <p className='name'>Nguyễn Văn A</p>
        <p>@Kolas</p>
        </div>
        <div className="detail">
          <p>3 Podcast</p>
          <p>5 Followers</p>
        </div>
        <p>Có 5 follower chung</p>
        <div className="detail">
        <button><RiHeartAdd2Line/></button>
        <button><FaEye/></button>
        </div>
      </div>

    </div>
  )
}

export default UserBox
