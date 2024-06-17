// import React, { useEffect, useState } from 'react'
// import './Messenger.css'
// import { RiUserSearchLine } from 'react-icons/ri'
// import { useSidebar } from '../../config/useSidebar';
// import { IoSettingsOutline } from 'react-icons/io5';
// import MessengerUserBox from '../../components/messenger/userBox/MessengerUserBox';
// import logo from '../../access/images/logos.png'
// import { use } from 'i18next';
// import { getAllConversationByToken, getConversationById, sendMesage } from '../../api/chat/conversation';
// import { useParams } from 'react-router-dom';
// import SockJS from 'sockjs-client';
// import { over } from 'stompjs';
// const Messenger = () => {
//     const { isHide, setHide, setShow } = useSidebar();
//     const [chat, setChat] = useState([]);
//     useEffect(() => {
//         setHide();
//     }, [isHide]);
//     useEffect(() => {
//         getAllConversationByToken().then((response) => {
//             console.log(response.data);
//             setChat(response.data);
//         }
//         ).catch((error) => {
//             console.error('Error:', error);
//         });
//     }, [])
//     const chatId = useParams().id;
//     // lấy user từ local storage
//     const user = JSON.parse(localStorage.getItem('user'));

//     // console.log(chatId);
//     const [messages, setMessages] = useState([]);
//     useEffect(() => {
//         getConversationById(chatId).then((response) => {
//             console.log(response.data);
//             setMessages(response.data);
//         }
//         ).catch((error) => {
//             console.error('Error:', error);
//         });
//     }, [chatId])
//     const handleSendMessage = (event) => {
//         event.preventDefault();
//         const message = document.getElementById('message').value;
//         console.log(message);
//         sendMesage(chatId, message).then((response) => {
//             console.log(response.data);
//             setMessages([...messages, response.data]);
//             document.getElementById('message').value = '';
//             // Cuộn xuống cuối cùng
//         }).catch((error) => {
//             console.error('Error:', error);
//         });
        
//         console.log('send message');
//     }
//     useEffect(() => {
//         var objDiv = document.querySelector(".message-frame-messages");
//         objDiv.scrollTop = objDiv.scrollHeight;
//     }, [messages])

//     const [stompClient, setStompClient] = useState();
//     const [isConnected, setIsConnected] = useState(false);
//     const connect = () => {
//         const sock = new SockJS('http://localhost:9090/ws');
//         const temp = over(sock);
//         setStompClient(temp);
//         const header={
//             Authorization: `Bearer ${localStorage.getItem('access_token')}`
//         }
//         temp.connect(header, onConnect, onError);
//     }

//     const onError = (error) => {
//         console.log(error);
//     }

//     const onConnect = () => {
//         setIsConnected(true);
//     }

//     useEffect(() => {
//         if(messages.newMessage && stompClient){
//             setMessages([...messages, messages.newMessage]);
//             stompClient?.send(`/app/message/`, {}, JSON.stringify(messages.newMessage));
//         }
//     }, [messages.newMessage])
//     const onMessageRevice = (payload) => {
//         console.log("recive message", JSON.parse(payload));
//         const reciveMessage = JSON.parse(payload);
//         setMessages([...messages, reciveMessage]);
//     }
//     useEffect(() => {
//         if(isConnected && stompClient && chatId){
//             const subcription = stompClient.subscribe(`/group/${chatId.toString}`, onMessageRevice);
//             return () => {
//                 subcription.unsubscribe();
//             }
//         }
//     })
//     useEffect(() => {
//         connect();
//     }, [])
//     useEffect(() => {
//         setMessages(messages.newMessage);
//     }, [messages.newMessage])

//     return (
//         <div className='messenger-page'>
//             <div className="messenger-header">
//                 <div className="logo">
//                 <img src={logo} alt="" />
                
//                 </div>
//                 <p>BLANKCIL CONNECT</p>
//                 <IoSettingsOutline />
//             </div>

//             <div className="messenger-content">
//                 <div className="messenger-sidebar">
//                     <div className="search">
//                         <input type="text" placeholder="Search" />
//                         <div className="searchIcon">
//                             <RiUserSearchLine />
//                         </div>
//                     </div>
//                     {chat.map((item, index) => {
//                         return (
//                             <MessengerUserBox key={index} conversation={item}/>
//                         )
//                     })}
//                 </div>
//                 <div className="messenger-message">
//                 <div className="messsage-frame">

// <div className="setting-bar">

//     <p>Thành viên</p>
//     {/* <div className="setting-bar-detail">
//         <div className="setting-bar-avatar">
//             <img src="https://www.w3schools.com/w3images/avatar2.png" alt="avatar" />
//         </div>
//         <div className="text-content">
//             <p className='name'>Nguyễn Văn A</p>
//             <p className='status'>Online 5 tiếng</p>
//         </div>
//     </div>
//     <div className="setting-bar-detail">
//         <div className="setting-bar-avatar">
//             <img src="https://www.w3schools.com/w3images/avatar2.png" alt="avatar" />
//         </div>
//         <div className="text-content">
//             <p className='name'>Nguyễn Văn A</p>
//             <p className='status'>Online 5 tiếng</p>
//         </div>
//     </div> */}
//     {/* Lấy thông tin từ chat với id = id từ useParams */}
//     {chat.map((item, index) => {
//         if (item.id == chatId) {
//             return (
//                 item.members.map((user, index) => {
//                     return (
//                         <div key={index} className="setting-bar-detail">
//                             <div className="setting-bar-avatar">
//                                 <img src="https://www.w3schools.com/w3images/avatar2.png" alt="avatar" />
//                             </div>
//                             <div className="text-content">
//                                 <p className='name'>{user.fullname}</p>
//                                 <p className='status'>Online 5 tiếng</p>
//                             </div>
//                         </div>
//                     );
//                 })
//             )
//         }
//     })}
// </div>
// <div className="messsage-frame-content">
//     <div className="message-frame-nav">
//         <p>{
//             chat.map((item, index) => {
//                 if (item.id == chatId) {
//                     return (
//                         item.title
//                     )
//                 }
//             }
//             )
//             }</p>
//     </div>
//     <div className="message-frame-messages">
//         {
//             messages.map((message) => {
//                 return (
//                     <div
//                         key={message.id}
//                         className={`message-frame-item ${message.user.id === user.id ? 'your-message' : ''}`}
//                     >

//                         <div className="message-frame-avatar">
//                             <img src="https://www.w3schools.com/w3images/avatar2.png" alt="avatar" />
//                         </div>
//                         <div className="message-frame-text">
//                             <p className="message-name">From: {message.user.fullname}</p>
//                             <p>{message.content}</p>
//                         </div>
//                     </div>
//                 );
//             })
//         }
//     </div>
//     <div >
//         <form className="input-message" onSubmit={handleSendMessage}>
//             <input
//                 type="text"
//                 placeholder="Nhập tin nhắn..."
//                 id="message"
//             />
//             <button type="submit">Gửi</button>
//         </form>
//     </div>
// </div>
// </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Messenger

import React, { useEffect, useState } from 'react';
import './Messenger.css';
import { RiUserSearchLine } from 'react-icons/ri';
import { useSidebar } from '../../config/useSidebar';
import { IoSettingsOutline } from 'react-icons/io5';
import MessengerUserBox from '../../components/messenger/userBox/MessengerUserBox';
import logo from '../../access/images/logos.png';
import { getAllConversationByToken, getConversationById, sendMesage } from '../../api/chat/conversation';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

const Messenger = () => {
    const { isHide, setHide, setShow } = useSidebar();
    const [chat, setChat] = useState([]);
    const [messages, setMessages] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const chatId = useParams().id;
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        setHide();
    }, [isHide, setHide]);

    useEffect(() => {
        getAllConversationByToken().then((response) => {
            console.log(response.data);
            setChat(response.data);
        }).catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    useEffect(() => {
        if (chatId) {
            getConversationById(chatId).then((response) => {
                console.log(response.data);
                setMessages(response.data);
            }).catch((error) => {
                console.error('Error:', error);
            });
        }
    }, [chatId]);

    const handleSendMessage = (event) => {
        event.preventDefault();
        const message = document.getElementById('message').value;
        console.log(message);
        sendMesage(chatId, message).then((response) => {
            console.log(response.data);
            setMessages((prevMessages) => [...prevMessages, response.data]);
            document.getElementById('message').value = '';
        }).catch((error) => {
            console.error('Error:', error);
        });
    };

    useEffect(() => {
        var objDiv = document.querySelector(".message-frame-messages");
        objDiv.scrollTop = objDiv.scrollHeight;
    }, [messages]);

    const connect = () => {
        const sock = new SockJS('http://localhost:9090/ws');
        const temp = over(sock);
        setStompClient(temp);
        const token = localStorage.getItem('access_token');
        const headers = {
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
        };
        temp.connect(headers, onConnect, onError);
    };
    
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    
    const onError = (error) => {
        console.log(error);
    };

    const onConnect = () => {
        setIsConnected(true);
    };

    const onMessageReceive = (payload) => {
        console.log("receive message", JSON.parse(payload.body));
        const receiveMessage = JSON.parse(payload.body);
        setMessages((prevMessages) => [...prevMessages, receiveMessage]);
    };

    useEffect(() => {
        if (isConnected && stompClient && chatId) {
            const subscription = stompClient.subscribe(`/group/${chatId}`, onMessageReceive);
            return () => {
                subscription.unsubscribe();
            };
        }
    }, [isConnected, stompClient, chatId]);

    useEffect(() => {
        connect();
    }, []);

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
                            {chat.map((item) => (
                                item.id === chatId && item.members.map((user, index) => (
                                    <div key={index} className="setting-bar-detail">
                                        <div className="setting-bar-avatar">
                                            <img src="https://www.w3schools.com/w3images/avatar2.png" alt="avatar" />
                                        </div>
                                        <div className="text-content">
                                            <p className='name'>{user.fullname}</p>
                                            <p className='status'>Online 5 tiếng</p>
                                        </div>
                                    </div>
                                ))
                            ))}
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
