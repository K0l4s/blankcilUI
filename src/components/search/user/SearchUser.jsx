import React from 'react'
import './SearchUser.css'
import { GrView } from 'react-icons/gr'
import { FcLike } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import { domainName } from '../../../api/endpoint'
const SearchUser = (user) => {
  const navigate = useNavigate();
  return (
    <div className='userBox'>
      <div className='userInfor'>
        <img src="https://cdn.tgdd.vn/hoi-dap/1314184/podcast-la-gi-co-gi-thu-vi-nghe-podcast-o-dau-2-1.jpg" alt="" className="img" />
        <div className="text">
          <h3 onClick={()=>navigate('/blankcilUI/profile/'+user.user.id)}>{user.user.fullname}</h3>
          <p>Có {user.user.podcasts.length} podcast</p>
        </div>
      </div>
      <div className="action">
        <button onClick={()=>navigate("/blankcilUI/profile/"+user.user.id)}><GrView/></button>
        <button><FcLike/></button>
      </div>
    </div>
  )
}

export default SearchUser