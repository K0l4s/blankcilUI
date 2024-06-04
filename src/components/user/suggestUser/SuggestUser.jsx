import React from 'react'
import './SuggestUser.css'
import UserBox from '../userBox/UserBox'
import SearchUser from '../../search/user/SearchUser'
const SuggestUser = () => {
  return (
    <div className='userList'>
        <p>Đang follow</p>
        <UserBox />
        <UserBox />
        <UserBox />
    </div>
  )
}

export default SuggestUser