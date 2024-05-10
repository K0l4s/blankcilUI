import React, { useState } from 'react'
import './Comment.css'
export const Comment = (comment) => {
    return (
        <div className='commentItem'>
            <div className="userInfor">
                <img src="https://cdn.tgdd.vn/hoi-dap/1314184/podcast-la-gi-co-gi-thu-vi-nghe-podcast-o-dau-2-1.jpg" alt="" className="img" />
                <h3>{comment.comment.user_comment.fullname}</h3>
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
