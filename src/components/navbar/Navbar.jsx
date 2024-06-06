import React, { useState } from 'react'
import './Navbar.css'
import { VscSettingsGear } from 'react-icons/vsc'
import { FaSignInAlt } from 'react-icons/fa'
import Authentication from '../authentication/Authentication'
const Navbar = () => {
  const [isOpenAuthen, setIsOpenAuthen] = useState(true)
  const toggleAuthentication = () => {
    setIsOpenAuthen(!isOpenAuthen)
  }
  return (
    <>
    <div className='navbar'>
        <div className="item">
          <img src="https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/429934366_3671566309785359_8190492890145683271_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeF1sTCoSnv2eqSURFZfJBZjVnukwAbEqAtWe6TABsSoC_X7ZBhTZkpEAoEGESUgEa-8JLmbgWCwHcM5pg7hDF8m&_nc_ohc=Tf13-IjWJs4Q7kNvgGptqHQ&_nc_ht=scontent.fsgn21-1.fna&oh=00_AYBB9io6uHMUOipOeFB4lPy1COG8ayqhVuwHwBKk_r67SA&oe=6667C116" alt="avatar" />
        </div>
        <div className="item">
            <VscSettingsGear/> 
        </div>
        <div className="item" onClick={toggleAuthentication}>
            <FaSignInAlt/> 
        </div>
    </div>
    <Authentication isOpen={isOpenAuthen} onClose={toggleAuthentication}/>
    </>
  )
}

export default Navbar