import React from 'react'
import './Navbar.css'
// import { CiHome } from 'react-icons/ci'
// import { FcAbout, FcAddColumn, FcBusinessContact, FcContacts, FcHome } from 'react-icons/fc'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const navigate = useNavigate();
    const [t] = useTranslation("navbar");
    return (
        <div className='navbar'>
            <img onClick={( )=>navigate("/")} src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/293944031/original/318f5b39b232bdcc8f54ecad0a548019db5b698e/design-outstanding-podcast-logo.jpg" alt="logo" className="logo" />
            <div className="buttonGroup">
            <button onClick={()=>navigate("/")}>{t("Homepage")}</button>
            <button>{t("Create")}</button>
            </div>
            <div className="profile">

            </div>
        </div>
    )
}

export default Navbar