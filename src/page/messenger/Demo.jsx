// MainComponent.js
import React, { useState } from 'react';
import PopupUser from '../../components/popupUser/PopupUser';

const Demo = () => {
    const [popupContent, setPopupContent] = useState('Chào mọi người!');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const handleMouseEnter = (content) => {
      document.querySelector('.popup').style.display = 'block';
        setPopupContent(content);
        setIsPopupVisible(true);
    };

    const handleMouseLeave = () => {
      console.log('leave');
      document.querySelector('.popup').style.display = 'none';
    };

    return (
        <div style={{position:'relative'}}>
            <p onMouseEnter={() => handleMouseEnter('Nội dung popup')} onMouseLeave={handleMouseLeave}>
                Rê chuột vào đây để hiển thị popup
            </p>
            {isPopupVisible && <PopupUser content={popupContent} />}
        </div>
    );
};

export default Demo;
