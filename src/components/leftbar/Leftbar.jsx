import React, { useEffect, useState } from 'react';
import './Leftbar.css';
import { useNavigate } from 'react-router-dom';
import CreatePodcastModal from '../../modal/podcast/create/CreatePodcastModal';
import logo from '../../access/images/logos.png';
import add from '../../access/images/add.png';
import out from '../../access/images/out.png';
const Leftbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const handleOpenAdd = () => {
    document.title = isOpenAdd ? "Blankcil" : "Create Podcast - Blankcil";
    setIsOpenAdd(!isOpenAdd);
  };
  const toggleAside = () => {
    const aside = document.querySelector('aside');
    aside.classList.toggle('minum');
  };
  // Kiểm tra sự thay đổi của màn hình, nếu màn hình fit mobile thì ẩn leftbar
  useEffect(() => {
  window.addEventListener('resize', () => {
    console.log(window.innerWidth)
    const aside = document.querySelector('aside');
    if(window.innerWidth <= 890) {
      aside.classList.add('minum');
    } else {
      aside.classList.remove('minum');
    }
  });
  }, []);

  return (
    // <div className='leftbar'>
      
    //   <div onClick={toggleAside} className="hideButton">
    //     <BsMenuUp size={30} />
    //   </div>
      <aside >
        <div className="closeBtn" onClick={toggleAside}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div onClick={() => navigate("/")} className='item active'>
          <img src={logo} alt="Home" className='logo'/>
          <p>Home</p>
        </div>
        {user ? (
          <>
            <div className='item' onClick={handleOpenAdd}>
              <img src={add} alt="add" />
              <p>Create</p>
            </div>
            <div className='item'>
              <img src={out} alt="logout" />
              <p>Logout</p>
            </div>
            <CreatePodcastModal isOpen={isOpenAdd} onClose={handleOpenAdd} />
          </>
        ) : (
          <div onClick={() => navigate("/login")} className='item'>
            <img src={out} alt="login" />
            <p>Login</p>
          </div>
        )}
      </aside>
    // </div>
  );
};

export default Leftbar;