import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePodcastModal from '../../modal/podcast/create/CreatePodcastModal';
import { useTranslation } from 'react-i18next';
import { useSidebar } from '../../config/useSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../redux/actions/authAction';
import Authentication from '../authentication/Authentication';
import { AiOutlinePlus, AiOutlineMessage, AiOutlineLogout, AiOutlineLogin, AiOutlineSetting } from 'react-icons/ai';
import { RiHomeLine } from 'react-icons/ri';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';

const Leftbar = () => {
  const [t] = useTranslation("leftbar");
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const theme = useSelector(state => state.themeMode.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isHide, setHide, setShow } = useSidebar();

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenAuthen, setIsOpenAuthen] = useState(true);

  const handleOpenAdd = () => {
    document.title = isOpenAdd ? "Blankcil" : "Create Podcast - Blankcil";
    setIsOpenAdd(!isOpenAdd);
  };

  

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    dispatch(logoutAction());
    setIsOpenAuthen(true);
  };

  const toggleAuthentication = () => {
    setIsOpenAuthen(!isOpenAuthen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 890) {
        setHide();
      } else {
        setShow();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setHide, setShow]);

  return (
    <>
      <aside className={theme}>
        {/* <div className="closeBtn" onClick={toggleAside}>
          <HiOutlineMenuAlt2 size={24} />
        </div> */}

        <div className='item active' onClick={() => navigate("/")}>
          <RiHomeLine className="icon" />
          <p>{t("Home")}</p>
        </div>



        {isAuthenticated ? (<>
          <div className='item' onClick={handleOpenAdd}>
            <AiOutlinePlus className="icon" />
            <p>{t("Create")}</p>
          </div>
          <div className='item' onClick={logout}>
            <AiOutlineLogout className="icon" />
            <p>{t("Logout")}</p>
          </div>
          <div className='item' onClick={() => navigate("/setting")}>
            <AiOutlineSetting className="icon" />
            <p>{t("Setting")}</p>
          </div></>
        ) : (
          <div className='item' onClick={toggleAuthentication}>
            <AiOutlineLogin className="icon" />
            <p>{t("Login")}</p>
          </div>
        )}
      </aside>

      <Authentication isOpen={isOpenAuthen} onClose={toggleAuthentication} />
      <CreatePodcastModal isOpen={isOpenAdd} onClose={handleOpenAdd} />

      <style jsx>{`
        aside {
          width: 250px;
          height: 100%;
          position: fixed;
          grid-area: aside;
          top: 50px;
          left: 0;
          background: linear-gradient(180deg, #1a1825 0%, #252233 100%);
          color: #b2a6f7;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 999;
          opacity: 1;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(8px);
        }

        aside.light {
          background: linear-gradient(180deg, #f5f5f5 0%, #e8e8e8 100%);
          color: #1a1825;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }

        aside.dark {
          background: linear-gradient(180deg, #1a1825 0%, #252233 100%);
          color: #f5f5f5;
        }

        aside .item {
          display: flex;
          height: 55px;
          width: 90%;
          margin: 8px auto;
          flex-direction: row;
          align-items: center;
          gap: 15px;
          padding: 0 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          border-radius: 12px;
        }

        aside .item:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        aside .item.active {
          background: rgba(178, 166, 247, 0.15);
        }

        aside .item .icon {
          font-size: 24px;
          transition: transform 0.3s ease;
        }

        aside .item p {
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          opacity: 1;
          transition: color 0.3s ease;
        }

        aside .closeBtn {
          display: flex;
          align-items: center;
          padding: 15px 20px;
          cursor: pointer;
          color: #b2a6f7;
        }

        @media (max-width: 768px) {
          aside {
            width: 70px;
            backdrop-filter: blur(12px);
          }
          
          aside .item {
            justify-content: center;
            padding: 0;
          }
          
          aside .item p {
            display: none;
          }
          
          aside .item .icon {
            font-size: 24px;
          }
          
          aside .closeBtn {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Leftbar;