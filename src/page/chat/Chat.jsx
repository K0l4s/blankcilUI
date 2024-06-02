import React, { useEffect } from 'react'
import './Chat.css'
import ChatUserInfor from '../../components/chat/ChatUserInfor'
const Chat = () => {
    useEffect(() => {
        document.title = "Message - Blankcil";
        document.querySelector('aside').classList.add('minum');
    }, []);
  return (
    <div className='chatPage'>
        <div className="leftContainer">
            <div className="chatList">
                <div className="chatListHeader">
                    <input type="text" placeholder="Search" />
                </div>
                <div className="chatListBody">
                    <ChatUserInfor/>
                    <ChatUserInfor/>
                    <ChatUserInfor/>
                    <ChatUserInfor/>
                    <ChatUserInfor/>
                    <ChatUserInfor/>
                    <ChatUserInfor/>
                    <ChatUserInfor/>
                    <ChatUserInfor/>
                    <ChatUserInfor/>
                    <ChatUserInfor/>
                    <ChatUserInfor/>
                    <ChatUserInfor/>
                    <ChatUserInfor/>
                    <ChatUserInfor/>
                    <ChatUserInfor/>
                    <ChatUserInfor/>
                    <ChatUserInfor/>
                    <ChatUserInfor/>
                    <ChatUserInfor/>
                    <ChatUserInfor/>
                    <ChatUserInfor/>
                </div>
            </div>
        </div>
        <div className="mainContainer">

        </div>
    </div>
  )
}

export default Chat