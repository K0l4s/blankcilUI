import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SettingPage from '../../setting/SettingPage'
import ChangeProfile from '../../changeProfile/ChangeProfile'

const SettingRoute = () => {
  return (
    <Routes>
        <Route path="/" element={<SettingPage/>}/>
        <Route path="/information" element={<ChangeProfile/>}/>
    </Routes>
  )
}

export default SettingRoute