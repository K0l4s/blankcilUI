import './Router.css'
import { Route, Routes } from 'react-router-dom'
import Home from '../home/Home'
import Leftbar from '../../components/leftbar/Leftbar'
import { changeLanguage } from 'i18next'
import Login from '../login/Login'
import Register from '../register/Register'
import Search from '../search/Search'
import View_profile from '../view_and_edit_profile/View_profile'
import NotFoundPage from '../404Page/NotFoundPage'
import PodcastPage from '../podcastPage/PodcastPage'
import Navbar from '../../components/navbar/Navbar'
import SettingPage from '../setting/SettingPage'
import Profile from '../profile/Profile'
import CodeRequest from '../codeRequest/CodeRequest'
import Messenger from '../messenger/Messenger'
import Demo from '../messenger/Demo'
// import ChatRoom from '../chat/ChatRoom'
const Router = () => {
  const url = window.location.href;
  
  const whiteList = ['/login','confirm/register/', '/register/', '/forgot', '/conversation']
  const isWhiteList = whiteList.some((path) => url.includes(path))
 
  return (
    <div className='router'>
      
      {
        isWhiteList
      ? <div></div> : <div>
      {/* Kiểm tra đường dẫn có chứa cụm từ profile hay không */}
      {/* {url.includes('profile') ? <div></div> : */}
        <div>
          <Leftbar />
          <Navbar />
          {/* <Rightbar /> */}
        </div>
        {/* } */}
        </div>}
        <div className="mainContent">
          {/* <div id="heart"></div> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/blankcilUI/profile" element={<Profile/>} /> */}
          {/* <Route path= "/profile/:id" element={<Profile_2/>}/> */}
          <Route path= "/profile/:nickname" element={<Profile/>}/>
          <Route path="/podcast/:id" element={<PodcastPage />} />

          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path='/confirm/register/:email' element={<CodeRequest pageName={"confirmEmail"}/>}/>
          <Route path="/forgot/password" element={<CodeRequest pageName={"forgotPassword"}/>} />

          <Route path="/search" element={<Search/>} />
          {/* <Route path="/blankcilUI/search/:search" element={<Search/>} /> */}
          {/* Edit route */}
          <Route path= "/edit/profile" element={<View_profile/>}/>
          {/* <Route path='/chat' element={<ChatRoom/>} /> */}
          
          <Route path="/setting" element={<SettingPage/>} />
          <Route path="/conversation" element={<Messenger/>} />
          <Route path="/conversation/:id" element={<Messenger/>} />
          {/* <Route path="/conversation/:id" element={<Demo/>} /> */}
          <Route path="/*" element={<NotFoundPage/>} />
        </Routes>
        </div>
    </div>
  )
}

export default Router