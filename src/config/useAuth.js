import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { apiPath } from '../api/endpoint';

// Hàm kiểm tra xem token đã hết hạn hay chưa
export const isTokenExpired = (token) => {
    const decodedToken = jwtDecode(token);
    console.log("Decode: " + decodedToken.exp);
    const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây
    console.log("Current: " + currentTime);
    return decodedToken.exp < currentTime;
};

export const checkTokenExpiration = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken && isTokenExpired(accessToken)) {
        const refreshToken = localStorage.getItem('refresh_token');
        console.log("Refresh token: " + refreshToken)
        if (!refreshToken) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
            return;
        }
        fetch(apiPath + 'auth/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + refreshToken
            }
        }).then((response => response.json())
        ).then((data) => {
            // console.log(data);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
        })
            .catch((error) => {
                // console.error('Error:', error);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('user');
                // navigate('/login');
            }
            );
    }
};


// Hook kiểm tra và làm mới token
const useAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log(navigate.name)
        if (navigate.name === "/login")
            return;
        // console.log("hello");
        checkTokenExpiration();
        const intervalId = setInterval(checkTokenExpiration, 10 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, [navigate]);
};

export default useAuth;
