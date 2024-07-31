import React, { useEffect, useState } from 'react';
import './Leftbar.css';
import { useNavigate } from 'react-router-dom';
import CreatePodcastModal from '../../modal/podcast/create/CreatePodcastModal';
import logo from '../../access/images/logos.png';
import add from '../../access/images/add.png';
import out from '../../access/images/out.png';
import search from '../../access/images/search.png';
import messageIcon from '../../access/images/message.png';
import { useTranslation } from 'react-i18next';
import { useSidebar } from '../../config/useSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../redux/actions/authAction';
import Authentication from '../authentication/Authentication';
const Leftbar = () => {
  const [t, i18n] = useTranslation("leftbar");
  // const user = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const theme = useSelector(state => state.themeMode.theme);

  const navigate = useNavigate();
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const dispatch = useDispatch();
  const handleOpenAdd = () => {
    document.title = isOpenAdd ? "Blankcil" : "Create Podcast - Blankcil";
    setIsOpenAdd(!isOpenAdd);
  };
  const toggleAside = () => {
    // const aside = document.querySelector('aside');
    // aside.classList.toggle('minum');
    setHide(!isHide);
  };
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    dispatch(logoutAction());
  }
  // Kiểm tra sự thay đổi của màn hình, nếu màn hình fit mobile thì ẩn leftbar
  const { isHide, setHide, setShow } = useSidebar();
  useEffect(() => {
    window.addEventListener('resize', () => {
      console.log(window.innerWidth)
      if (window.innerWidth <= 890) {
        setHide();
      } else {
        setShow();
      }
    }); 
  }, []);
  const [isOpenAuthen, setIsOpenAuthen] = useState(true)
  const toggleAuthentication = () => {
    setIsOpenAuthen(!isOpenAuthen)
  } 
  
  return (
    
    // <div className='leftbar'>

    //   <div onClick={toggleAside} className="hideButton">
    //     <BsMenuUp size={30} />
    //   </div>
    <>
    <aside className={theme}>
      <div className="closeBtn" onClick={toggleAside}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className='item active'>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRdfkX2uDXUVbBig8XPAIppoZUz03tv9-FYg&s' alt="Home" className='logo' />
        <p>{t("Home")}</p>
      </div>
      {/* <div className='item' onClick={() => navigate("/search")}>
        <img src={search} alt="search" />
        <p>{t("Search")}</p>
      </div> */}
      {/* {isAuthenticated ? ( */}
        <>
          <div className='item' onClick={handleOpenAdd}>
            <img src={add} alt="add" />
            <p>{t("Create")}</p>
          </div>
          <div className='item' onClick={() => navigate("/conversation")}>
            <img src={messageIcon} alt="add" />
            <p>{t("Message")}</p>
          </div>
          <div className='item' onClick={toggleAuthentication}>
            <img src={out} alt="logout"/>
            <p>{t("Logout")}</p>
          </div>
     
      
        </>
        
    </aside>
    <Authentication isOpen={isOpenAuthen} onClose={toggleAuthentication} />
    <CreatePodcastModal isOpen={isOpenAdd} onClose={handleOpenAdd} />
    </>
  );
};

export default Leftbar;