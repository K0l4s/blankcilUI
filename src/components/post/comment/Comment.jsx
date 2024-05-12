import React, { useState } from 'react'
import './Comment.css'
import { TiMediaPlayOutline } from 'react-icons/ti'
import { FcLike } from 'react-icons/fc';
import { BsReplyAll } from 'react-icons/bs';
import axios from 'axios';
import { apiPath, domainName } from '../../../api/endpoint';
import { useToast } from '@chakra-ui/react';
export const Comment = (comment) => {
    const toast = useToast();
    let avatar = "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611750.jpg";
    if (comment.comment.user_comment.avatar_url) {
        avatar = comment.comment.user_comment.avatar_url;
    }
    const [totalReply, setTotalReply] = useState(comment.comment.totalReplies);
    const [totalLike, setTotalLike] = useState(comment.comment.totalLikes);
    const [isReplyInput, setIsReplyInput] = useState(false);
    const [replies, setReplies] = useState([]);
    const replyRequest = async () => {
        const content = document.getElementById('createReply' + comment.comment.id).value;
        console.log(content);
        const token = localStorage.getItem('access_token');
        const formData = new URLSearchParams();
        formData.append('content', content);
        formData.append('commentId', comment.comment.id);

        axios.post(apiPath + `users/reply/comment `, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            console.log(response.data);
            setReplies([...replies, response.data.body]);
            console.log(replies);
            setTotalReply(totalReply + 1);
            // document.getElementById('createComment'+podcast.id).value = '';
            // comment.re += 1;
        }
        ).catch((error) => {
            console.error('Error:', error);
        });
    }
    const fetchReplies = async () => {
        const token = localStorage.getItem('access_token');
        axios.get(apiPath + `podcast/view/replies/${comment.comment.id}`, {
            headers: {
                'ngrok-skip-browser-warning': 'any_value',
            }
        }).then((response) => {
            console.log(response.data);
            setReplies(response.data.body);
        }).catch((error) => {
            console.error('Error:', error);
            toast({
                title: "Lỗi",
                description: "Thao tác quá nhanh hoặc chưa đăng nhập. Vui lòng thử lại!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-right"
              });
        });
    }
    const replyButtonClick = () => {
        setIsReplyInput(!isReplyInput);
        if (replies.length === 0) {
            fetchReplies();
        }
    }
    // if (replies.length === 0) {
    //     fetchReplies();
    // }


    // const time = new Date(comment.comment.timestamp).toLocaleDateString() + ' lúc ' + new Date(comment.comment.timestamp).toLocaleTimeString();
    const now = new Date().getTime();
    const timestamp = new Date(comment.comment.timestamp).getTime();
    const diff = now - timestamp;
    // console.log(diff);
    let time = '';
    if (diff < 60000) {
        time = 'Vừa xong';
    } else if (diff < 3600000) {
        time = Math.floor(diff / 60000) + ' phút trước';
    } else if (diff < 86400000) {
        time = Math.floor(diff / 3600000) + ' giờ trước';
    } else {
        time = new Date(comment.comment.timestamp).toLocaleDateString() + ' lúc ' + new Date(comment.comment.timestamp).toLocaleTimeString();
    }

    return (
        <div className='commentItem'>
            <div className="userInfor">

                <img src={avatar} alt="" className="img" />
                <a  href={domainName+"blankcilUI/profile/"+comment.comment.user_comment.id}><h3>{comment.comment.user_comment.fullname}</h3></a>
                <TiMediaPlayOutline />
                <p>{time}</p>
            </div>

            <div className="commentContent">
                <p>{comment.comment.content}</p>
            </div>
            {/* <hr></hr> */}
            <div className="commentIcon">
                <div className="like">
                    <FcLike />
                    <span>{totalLike}</span>
                </div>
                <div className="reply" onClick={replyButtonClick}>
                    <BsReplyAll />
                    <span>{totalReply}</span>
                </div>
            </div>
            <hr></hr>
            {/* {comment.comment.replies && (<div className="replyButton">Trả lời</div>)} */}

            {isReplyInput ? (
                <>
                    <div className="replies">
                        {replies && (
                            <div className="replies">
                                {replies.map((reply, index) => (
                                    <Comment key={index} comment={reply} />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="inputReply">
                        <input id={'createReply' + comment.comment.id} type="text" placeholder="Nhập câu trả lời của bạn" />
                        <button onClick={replyRequest}>Trả lời</button>
                    </div></>) : null}
        </div>
    )
}
