import React from 'react'
import './Navbar.css'
import { VscSettingsGear } from 'react-icons/vsc'
const Navbar = () => {
  return (
    <div className='navbar'>
        <p>Xin chào, User</p>
        <div className="item">
            <VscSettingsGear/> 
        </div>
    </div>
  )
}

export default Navbar