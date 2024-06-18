import React, { useEffect, useRef, useState } from 'react';
import './Messenger.css';
import { RiUserSearchLine } from 'react-icons/ri';
import { IoSettingsOutline } from 'react-icons/io5';
import MessengerUserBox from '../../components/messenger/userBox/MessengerUserBox';
import logo from '../../access/images/logos.png';
import { getAllConversationByToken, getConversationById, sendMesage } from '../../api/chat/conversation';
import { json, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useToast } from '@chakra-ui/react';

const Messenger = () => {
    const [chat, setChat] = useState([]);
    const [messages, setMessages] = useState([]);
    const { id: chatId } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const toast = useToast();
    useEffect(() => {
        getAllConversationByToken()
            .then((response) => {
                setChat(response.data);
            })
            .catch((error) => {
                console.error('Error fetching conversations:', error);
            });
    }, [chatId]);

    useEffect(() => {
        getConversationById(chatId)
            .then((response) => {
                setMessages(response.data);
            })
            .catch((error) => {
                console.error('Error fetching messages:', error);
            });
    }, [chatId]);

    useEffect(() => {
        const objDiv = document.querySelector(".message-frame-messages");
        objDiv.scrollTop = objDiv.scrollHeight;
    }, [messages]);

    const clientRef = useRef(null);
    useEffect(() => {
        const socket = new SockJS('http://localhost:9090/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log(str),
            onConnect: () => {
                console.log('Connected');
                client.subscribe(`/group/${chatId}`, (message) => {
                    setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body)]);
                    toast ({
                        title: 'New message from' + JSON.parse(message.body).user.fullname,
                        description: JSON.parse(message.body).content,
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                        position: 'bottom-right'
                    });

                });
            },
            onDisconnect: () => {
                console.log('Disconnected');
            },
        });
        client.connectHeaders = {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        };
        client.activate();
        clientRef.current = client;

        return () => {
            if (clientRef.current) {
                clientRef.current.deactivate();
            }
        };
    }, []);
    const handleSendMessage = (event) => {
        event.preventDefault();

        const content = document.getElementById('message').value;
        sendMesage(chatId, content).then((response) => {
            const message = {
                id: response.data.id,
                content: response.data.content,
                chatEntity: { id: response.data.chatEntity.id },
                user: { id: user.id, fullname: user.fullname , avatar_url: user.avatar_url, nickName: user.nickName},
                timestamp: response.data.timestamp
              };
              console.log(message);
              clientRef.current.publish({
                destination: '/app/message',
                // body: JSON.stringify(message),
                body: JSON.stringify(message)
              });
                document.getElementById('message').value = '';
        }).catch((error) => {
            console.error('Error sending message:', error);
        }
        
        );
        
    };
    return (
        <div className='messenger-page'>
            <div className="messenger-header">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <p>BLANKCIL CONNECT</p>
                <IoSettingsOutline />
            </div>

            <div className="messenger-content">
                <div className="messenger-sidebar">
                    <div className="search">
                        <input type="text" placeholder="Search" />
                        <div className="searchIcon">
                            <RiUserSearchLine />
                        </div>
                    </div>
                    {chat.map((item, index) => (
                        <MessengerUserBox key={index} conversation={item} />
                    ))}
                </div>
                <div className="messenger-message">
                    <div className="message-frame">
                        <div className="setting-bar">
                            <p>Thành viên</p>
                            {chat.map((item) =>
                                item.id === chatId &&
                                item.members.map((member, index) => (
                                    <div key={index} className="setting-bar-detail">
                                        <div className="setting-bar-avatar">
                                            <img src="https://www.w3schools.com/w3images/avatar2.png" alt="avatar" />
                                        </div>
                                        <div className="text-content">
                                            <p className='name'>{member.fullname}</p>
                                            <p className='status'>Online 5 tiếng</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="message-frame-content">
                            <div className="message-frame-nav">
                                <p>{chat.find(item => item.id === chatId)?.title}</p>
                            </div>
                            <div className="message-frame-messages">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`message-frame-item ${message.user.id === user.id ? 'your-message' : ''}`}
                                    >
                                        <div className="message-frame-avatar">
                                            <img src="https://www.w3schools.com/w3images/avatar2.png" alt="avatar" />
                                        </div>
                                        <div className="message-frame-text">
                                            <p className="message-name">From: {message.user.fullname}</p>
                                            <p>{message.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <form className="input-message" onSubmit={handleSendMessage}>
                                    <input
                                        type="text"
                                        placeholder="Nhập tin nhắn..."
                                        id="message"
                                    />
                                    <button type="submit">Gửi</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messenger;
