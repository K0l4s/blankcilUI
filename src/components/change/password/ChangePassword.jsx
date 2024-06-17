import React from 'react'
import './ChangePassword.css'
const ChangePassword = ({isOpen,onClose}) => {
    if(!isOpen || isOpen === false) return null
  return (
    <div>ChangePassword</div>
  )
}

export default ChangePassword