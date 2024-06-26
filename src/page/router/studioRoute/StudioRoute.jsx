import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Studio from '../../studio/Studio'

const StudioRoute = () => {
  return (
    <Routes>
        <Route path="/" element={<Studio/>}/>
    </Routes>
  )
}

export default StudioRoute