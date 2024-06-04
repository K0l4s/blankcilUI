import React from 'react'
import './UserBox.css'
const UserBox = () => {
  return (
    <div className='userItem'>
        <div className="av">
            <img src="https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg" alt="avatar" />
        </div>
        <div className="info">
            <p className='name'>Nguyễn Văn A</p>
        </div>
    </div>
  )
}

export default UserBox