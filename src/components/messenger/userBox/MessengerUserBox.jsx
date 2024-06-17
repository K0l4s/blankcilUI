import React from 'react'
import './MessengerUserBox.css'
const MessengerUserBox = ({conversation}) => {
  function truncateString(str) {
    if (str.length > 5) {
        return str.substring(0, 25) + '...';
    }
    return str;
}
  return (
    <div className="messenger-userbox">
                        <div className="messenger-userbox-avatar">
                            <img src={
                                conversation.image? conversation.image : 'https://www.w3schools.com/w3images/avatar2.png'
                            } alt="avatar" />
                            {(conversation.group == true) && conversation.members.length>2?
                            <div className="size">
                                <p>+{conversation.members.length-2}</p>
                                </div>:null
                            }
                        </div>
                        <div className="messenger-detail">
                            <p className='name'>{truncateString(conversation.title)}</p>
                            <p className='time'>13 giờ trước</p>
                            <p className='lastMessage'>Hi!</p>
                        </div>
                    </div>
  )
}

export default MessengerUserBox