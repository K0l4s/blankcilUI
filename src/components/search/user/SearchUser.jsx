import React, { useEffect, useState } from 'react'
import './SearchUser.css'
import { GrView } from 'react-icons/gr'
import { FcLike, FcLikePlaceholder } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import { apiPath, domainName } from '../../../api/endpoint'
import axios from 'axios'
import { toggleFollow } from '../../../api/user/user'
const SearchUser = ({user}) => {
  const navigate = useNavigate();
  const [isFollow, setIsFollow] = useState(user.follow);
 
  return (
    <div className='userBox'>
      <div className='userInfor'>
        <img src="https://cdn.tgdd.vn/hoi-dap/1314184/podcast-la-gi-co-gi-thu-vi-nghe-podcast-o-dau-2-1.jpg" alt="" className="img" />
        <div className="text">
          <h3 onClick={()=>navigate('/profile/'+user.nickName)}>{user.fullname}</h3>
          <p>Có {user.podcasts.length} podcast</p>
        </div>
      </div>
      <div className="action">
        <button onClick={()=>navigate("/profile/"+user.id)}><GrView/></button>
        <button onClick={()=>toggleFollow(setIsFollow, user.id)}>
        {isFollow?<FcLike/>:<FcLikePlaceholder/>}
        </button>{/* <button><FcLike/></button> */}
      </div>
    </div>
  )
}

export default SearchUser