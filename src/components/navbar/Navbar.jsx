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
            <div className="buttonGroup">
            <button onClick={()=>navigate("/blankcilUI")}>{t("Homepage")}</button>
            <button>{t("Create")}</button>
            </div>
            <div className="profile">
            </div>
        </div>
    )
}

export default Navbar