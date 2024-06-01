import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

// Hàm kiểm tra xem token đã hết hạn hay chưa
const isTokenExpired = (token) => {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây
    return decodedToken.exp < currentTime; // Kiểm tra xem thời gian hết hạn của token nhỏ hơn thời gian hiện tại hay không
};

// Hàm làm mới access token
const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await fetch('/refresh-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.access_token);
        return data.access_token;
    } else {
        console.error('Refresh token failed');
        return null;
    }
};

// Hook kiểm tra và làm mới token
const useAuth = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const checkTokenExpiration = async () => {
            const accessToken = localStorage.getItem('accessToken');

            if (accessToken && isTokenExpired(accessToken)) {
                const newAccessToken = await refreshToken();
                if (!newAccessToken) {
                    // Token refresh failed, log out the user
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    navigate("/login");
                }
            }
        };

        const intervalId = setInterval(checkTokenExpiration, 10
             * 60 * 1000); 

        return () => clearInterval(intervalId);
    }, [navigate]);
};

export default useAuth;
