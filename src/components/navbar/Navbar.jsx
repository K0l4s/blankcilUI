import React, { useState } from 'react'
import './Navbar.css'
import { VscSettingsGear } from 'react-icons/vsc'
import { FaSignInAlt } from 'react-icons/fa'
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import Authentication from '../authentication/Authentication'
import { Tooltip } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  // const navigate = useNavigate();
  const path = window.location.pathname;
  console.log(path) 
  const [isOpenAuthen, setIsOpenAuthen] = useState(true)
  const toggleAuthentication = () => {
    setIsOpenAuthen(!isOpenAuthen)
  }
  return (
    <>
      <div className='navbar'>
        <Tooltip hasArrow label='Your Profile' bg='gray.300' color='black'>
          <div className="item">
            <img src="https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/429934366_3671566309785359_8190492890145683271_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeF1sTCoSnv2eqSURFZfJBZjVnukwAbEqAtWe6TABsSoC_X7ZBhTZkpEAoEGESUgEa-8JLmbgWCwHcM5pg7hDF8m&_nc_ohc=Tf13-IjWJs4Q7kNvgGptqHQ&_nc_ht=scontent.fsgn21-1.fna&oh=00_AYBB9io6uHMUOipOeFB4lPy1COG8ayqhVuwHwBKk_r67SA&oe=6667C116" alt="avatar" />
          </div>
        </Tooltip>

        <Tooltip hasArrow label='Setting' bg='gray.300' color='black'>
          <div className="item">
            <VscSettingsGear />
          </div>
        </Tooltip>
        {(path=="/" || path=="/home") &&
          <>
            <Tooltip hasArrow label='Trending' bg='gray.300' color='black'>
              <div className="item active">
                <FaArrowTrendUp />
              </div>
            </Tooltip>

            <Tooltip hasArrow label='Following' bg='gray.300' color='black'>
              <div className="item">
                <MdOutlineConnectWithoutContact />
              </div>
            </Tooltip>
          </>
        }
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