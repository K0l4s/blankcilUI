import './Router.css'
import { Route, Routes } from 'react-router-dom'
import Home from '../home/Home'
import Leftbar from '../../components/leftbar/Leftbar'
// import { changeLanguage } from 'i18next'
import Search from '../search/Search'
import NotFoundPage from '../404Page/NotFoundPage'
import PodcastPage from '../podcastPage/PodcastPage'
import Navbar from '../../components/navbar/Navbar'
import Profile from '../profile/Profile'
import CodeRequest from '../codeRequest/CodeRequest'
import Messenger from '../messenger/Messenger'
import Demo from '../messenger/Demo'
import StudioRoute from './studioRoute/StudioRoute'
import SettingRoute from './settingRoute/SettingRoute'
import PodcastPlayBox from '../../components/podcastPlayBox/PodcastPlayBox'
import { use } from 'i18next'
import { useSelector } from 'react-redux'
// import useAuth from '../../config/useAuth'
const Router = () => {
  const url = window.location.href;
  
  const whiteList = ['/login','confirm/register/', '/register/', '/forgot', '/conversation','/user/analyst','/studio']
  const isWhiteList = whiteList.some((path) => url.includes(path))
  const theme = useSelector(state => state.themeMode.theme);

  return (
    <div className={'router ' +theme}>
      {
        isWhiteList
      ? <div></div> : <div>
        <div>
          <Leftbar />
          <Navbar />
          
        </div>
        {/* } */}
        </div>}
        
        <div className="mainContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path= "/profile/:nickname" element={<Profile/>}/>

          <Route path='/studio' element={<StudioRoute/>}/>

          <Route path="/podcast/:id" element={<PodcastPage />} />
          <Route path='/confirm/register/:email' element={<CodeRequest pageName={"confirmEmail"}/>}/>
          <Route path="/forgot/password" element={<CodeRequest pageName={"forgotPassword"}/>} />

          <Route path="/search" element={<Search/>} />
          
          <Route path="/setting" element={<SettingRoute/>} />
          <Route path="/conversation" element={<Messenger/>} />
          <Route path="/conversation/:id" element={<Messenger/>} />
          
          <Route path='/demo' element = {<Demo/>} />

          <Route path="/*" element={<NotFoundPage/>} />
        </Routes>
        </div>
        {/* <PodcastPlayBox/> */}
    </div>
  )
}

export default Router