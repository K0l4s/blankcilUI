import React from 'react'
import '../Authentication.css'
const ResetPassword = () => {
    
    return (
        <div className='child-container'>
            <div className="overlay"></div>
            <div className="authen">
                <div className="closeBtn">X</div>
                <h1>Reset Password</h1>
                <form>
                    <div className="inputGroup">
                        <input required id='oldPwd' type="password" placeholder=' ' />
                        <label htmlFor="oldPwd">Mật khẩu cũ</label>
                    </div>
                    <div className="inputGroup">
                        <input required id='newPwd' type="password" placeholder=' ' />
                        <label htmlFor="newPwd">Mật Khẩu mới</label>
                    </div>
                    <div className="inputGroup">
                        <input required id='repeatPwd' type="password" placeholder=' ' />
                        <label htmlFor="newPwd">Lặp lại mật Khẩu mới</label>
                    </div>
                    <button type="submit">Đổi mật khẩu</button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword