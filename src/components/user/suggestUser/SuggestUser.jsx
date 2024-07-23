import React from 'react'
import './SuggestUser.css'
import UserBox from '../userBox/UserBox'
import SearchUser from '../../search/user/SearchUser'
import { useSelector } from 'react-redux'

const SuggestUser = () => {
  const theme = useSelector(state => state.themeMode.theme);
  return (
    <div className={'userList '+ theme}>
        <p>Gợi ý follow</p>
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />

    </div>
  )
}

export default SuggestUser