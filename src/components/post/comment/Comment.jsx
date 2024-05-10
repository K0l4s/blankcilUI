import React, { useState } from 'react'
import './Comment.css'
import { TiMediaPlayOutline } from 'react-icons/ti'
export const Comment = (comment) => {
    
    
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
                
                <img src="https://cdn.tgdd.vn/hoi-dap/1314184/podcast-la-gi-co-gi-thu-vi-nghe-podcast-o-dau-2-1.jpg" alt="" className="img" />
                <h3>{comment.comment.user_comment.fullname}</h3>
                <TiMediaPlayOutline />
                <p>{time}</p>
            </div>
            <div className="commentContent">
                <p>{comment.comment.content}</p>
            </div>
            {/* {comment.comment.replies && (<div className="replyButton">Trả lời</div>)} */}
            <div className="replies">
                {comment.comment.replies && (
                    <div className="replies">
                        {comment.comment.replies.map((reply, index) => (
                            <Comment key={index} comment={reply} />
                        ))}
                    </div>
                )}
                
            </div>
        </div>
    )
}
