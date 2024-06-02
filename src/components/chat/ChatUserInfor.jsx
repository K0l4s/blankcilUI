import React from 'react'
import './ChatUserInfor.css'
const ChatUserInfor = () => {
  return (
    <div className='chatUserInf'>
        <div className="chatUserInfAvatar">
            <img src="https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611750.jpg" alt="" />
        </div>
        <div className="chatUserInfContent">
            <div className="chatUserInfTitle">
                <p>Nguyễn Văn A</p>
            </div>
            <div className="chatUserInfLastMess">
                <p>Chào bạn</p>
            </div>
        </div>
    </div>
  )
}

export default ChatUserInfor