import React from 'react'
import './SettingPage.css'
const SettingPage = () => {
  return (
    <div>
        <div className='setting'>
            <h1>Setting</h1>
            <div className="settingItem">
              <div className="content-container">
                <p>Họ và tên: Huỳnh Trung Kiên</p>
                <p>Ngày sinh: 17/2/2003</p>
                <p>Giới tính: Nam</p>
                <p>Email: ********@gmail.com</p>
                <p>Số điện thoại: 0123456***</p>
                
              </div>
                <p>Change password</p>
            </div>
        </div>
    </div>
  )
}

export default SettingPage