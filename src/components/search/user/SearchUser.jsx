import React from 'react'
import './SearchUser.css'
import { GrView } from 'react-icons/gr'
import { FcLike } from 'react-icons/fc'
const SearchUser = (user) => {
  return (
    <div className='userBox'>
      <div className='userInfor'>
        <img src="https://cdn.tgdd.vn/hoi-dap/1314184/podcast-la-gi-co-gi-thu-vi-nghe-podcast-o-dau-2-1.jpg" alt="" className="img" />
        <div className="text">
          <h3>{user.user.fullname}</h3>
          <p>Có {user.user.podcasts.length} podcast</p>
        </div>
      </div>
      <div className="action">
        <button><GrView/></button>
        <button><FcLike/></button>
      </div>
    </div>
  )
}

export default SearchUser