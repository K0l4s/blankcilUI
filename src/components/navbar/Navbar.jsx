import React, { useState } from 'react'
import './Navbar.css'
import { VscSettingsGear } from 'react-icons/vsc'
import { FaSignInAlt } from 'react-icons/fa'
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import Authentication from '../authentication/Authentication'
import { Tooltip } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { IoIosNotifications } from "react-icons/io";
import DropDownMenu from '../dropMenu/DropDownMenu';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;
  console.log(path)
  const [isOpenAuthen, setIsOpenAuthen] = useState(true)
  const toggleAuthentication = () => {
    setIsOpenAuthen(!isOpenAuthen)
  } 
  const dispatch = useDispatch();
  const toggleThemeButton = () => {
    dispatch({type: 'TOGGLE_THEME'});
  }
  return (
    <>
      <div className='navbar'>
        <Tooltip hasArrow label='Your Profile' bg='gray.300' color='black'>
          <div className="item">
            <img src="https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/429934366_3671566309785359_8190492890145683271_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeF1sTCoSnv2eqSURFZfJBZjVnukwAbEqAtWe6TABsSoC_X7ZBhTZkpEAoEGESUgEa-8JLmbgWCwHcM5pg7hDF8m&_nc_ohc=Tf13-IjWJs4Q7kNvgGptqHQ&_nc_ht=scontent.fsgn21-1.fna&oh=00_AYBB9io6uHMUOipOeFB4lPy1COG8ayqhVuwHwBKk_r67SA&oe=6667C116" alt="avatar" />
          </div>
        </Tooltip>
        
        {/* <Tooltip hasArrow label='Setting' bg='gray.300' color='black'> */}
          <div className="item">
          <DropDownMenu trigger={<VscSettingsGear />}>
                <p>Setting</p>
                <p>Logout</p>
          </DropDownMenu>
          </div>
        {/* </Tooltip> */}
        {(path == "/" || path == "/home") &&
          <>
            <Tooltip hasArrow label='Trending' bg='gray.300' color='black'>
              <div className="item active">
                <FaArrowTrendUp />
              </div>
            </Tooltip>
            <Tooltip hasArrow label='Following' bg='gray.300' color='black'>
              <div className="item">
                <MdOutlineConnectWithoutContact onClick={toggleThemeButton}/>
              </div>
            </Tooltip>
          </>
        }
        <Tooltip hasArrow label='Thông báo' bg='gray.300' color='black'>
          <div className="item" onClick={null} style={{position:'relative'}}>
            
          <DropDownMenu trigger={
            <>
            <IoIosNotifications />
        <p style={{position:'absolute',width:'15px',height:'15px','top':'-5px','right':'-5px',color:'white'
          ,borderRadius: '50%',backgroundColor:'red',fontSize:'10px',fontWeight:'bold', textAlign:'center'}}>1</p>
            </>
          }
          >
                <>
                <p>Comment 1</p>
                <p>Comment 2</p>
                </>
              </DropDownMenu>
          </div>
        </Tooltip>
        <Tooltip hasArrow label='Đăng nhập/Đăng ký' bg='gray.300' color='black'>
          <div className="item" onClick={toggleAuthentication}>
            <FaSignInAlt />
            
          </div>
        </Tooltip>
      </div>
      <Authentication isOpen={isOpenAuthen} onClose={toggleAuthentication} />
      
    </>
  )
}

export default Navbar