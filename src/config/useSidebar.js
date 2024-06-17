import React, { createContext, useState, useContext, useEffect } from 'react';

// Tạo context
const HideSideContext = createContext();

// Tạo một provider để bọc các component cần sử dụng ngôn ngữ
const HideSideProvider = ({ children }) => {
    const [isHide, setHideSide] = useState(false);

    const toggleHide = (isHide) => {
        setHideSide(!isHide);
    };
    const setHide = (isHide) => {
        setHideSide(isHide);
    };

    const setShow = (isHide) => {
        setHideSide(isHide);
    };
    useEffect(() => {
        if(!document.querySelector('aside')) return;
        const systemHide = localStorage.getItem('hideSide');
        if (systemHide === 'true') {
            document.querySelector('aside').classList.add('minum');
            return;
        }
        if (isHide)
            document.querySelector('aside').classList.add('minum');
        else
            document.querySelector('aside').classList.remove('minum');
    }, [isHide]);
    return (
        <HideSideContext.Provider value={{ isHide, toggleHide, setHide, setShow }}>
            {children}
        </HideSideContext.Provider>
    );
};

// Hook tùy chỉnh để sử dụng context
const useSidebar = () => useContext(HideSideContext);

export { HideSideProvider, useSidebar };
