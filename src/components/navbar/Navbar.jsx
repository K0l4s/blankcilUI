import React from 'react'
import { VscSettingsGear } from 'react-icons/vsc'
import { FaArrowTrendUp } from "react-icons/fa6"
import { MdOutlineConnectWithoutContact } from "react-icons/md"
import { Tooltip } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { IoIosNotifications } from "react-icons/io"
import DropDownMenu from '../dropMenu/DropDownMenu'
import { useDispatch } from 'react-redux'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const toggleThemeButton = () => {
    dispatch({type: 'TOGGLE_THEME'})
  }

  return (
    <>
      <nav className='navbar'>
        <div className="search">
          <input type="text" placeholder="Search" />
          <img src="https://img.icons8.com/ios-filled/50/000000/search--v1.png" alt="search" />
        </div>

        <div className='right'>
          <Tooltip hasArrow label='Trending' bg='gray.300' color='black'>
            <div className="item active">
              <FaArrowTrendUp />
            </div>
          </Tooltip>
          
          {/* <Tooltip hasArrow label='Following' bg='gray.300' color='black'>
            <div className="item">
              <MdOutlineConnectWithoutContact onClick={toggleThemeButton}/>
            </div>
          </Tooltip> */}

          {/* <Tooltip hasArrow label='Notifications' bg='gray.300' color='black'>
            <div className="item">
              <DropDownMenu 
                trigger={
                  <div className="notification-icon">
                    <IoIosNotifications />
                    <span className="notification-badge">1</span>
                  </div>
                }
              >
                <div className="notification-items">
                  <p>Comment 1</p>
                  <p>Comment 2</p>
                </div>
              </DropDownMenu>
            </div>
          </Tooltip> */}
        </div>
      </nav>

      <style jsx>{`
        .navbar {
          height: 50px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
        }

        .search {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 5px 15px;
          width: 300px;
        }

        .search input {
          background: transparent;
          border: none;
          outline: none;
          width: 100%;
          color: inherit;
          font-size: 14px;
        }

        .search img {
          width: 20px;
          height: 20px;
          opacity: 0.6;
        }

        .right {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .item {
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .item:hover {
          background: rgba(255,255,255,0.1);
        }

        .item.active {
          color: #4a90e2;
        }

        .notification-icon {
          position: relative;
        }

        .notification-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          width: 15px;
          height: 15px;
          background: red;
          color: white;
          border-radius: 50%;
          font-size: 10px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .notification-items {
          padding: 10px;
        }

        .notification-items p {
          padding: 8px;
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }

        .notification-items p:last-child {
          border: none;
        }

        @media (max-width: 768px) {
          .search {
            width: 200px;
          }
          
          .right {
            gap: 15px;
          }
        }
      `}</style>
    </>
  )
}

export default Navbar