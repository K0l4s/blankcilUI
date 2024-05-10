import React from 'react'
import './Rightbar.css'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLogin } from 'react-icons/ai';
import { RiRegisteredFill } from 'react-icons/ri';
const Rightbar = () => {
  const navigate = useNavigate();
  return (
    <div className='rightbar'>
        <button onClick={()=>navigate("/blankcilUI/login")}><AiOutlineLogin/></button>
        <button onClick={()=>navigate("/blankcilUI/register")}><RiRegisteredFill/></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>

    </div>
  )
}

export default Rightbar