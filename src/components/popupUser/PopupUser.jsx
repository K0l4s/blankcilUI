// Popup.js
import React from 'react';
import './PopupUser.css'; // File CSS để thiết lập kiểu cho popup

const PopupUser = ({ content }) => {
    return (
        <div className="popup">
            <span className="popup-content">{content}</span>
        </div>
    );
};

export default PopupUser;
