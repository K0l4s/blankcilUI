import axios from 'axios';
import React from 'react'
import { apiPath } from '../endpoint';

export const toggleFollow =  async(setIsFollow,id) => {
  const token = localStorage.getItem('access_token');
  axios.post(apiPath + `users/follow/${id}`, {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then((response) => {
    console.log(response.data);
    if (response.data.message === "isFollow") {
      setIsFollow(true);
    } else {
      setIsFollow(false);
    }
  }
  ).catch((error) => {
    console.error('Error:', error);
  });
  
}

export const getProfile = async(nickname) => {
  const token = localStorage.getItem('access_token');
    let headers = {
      'ngrok-skip-browser-warning': 'any_value'
    };
    if (token) {
      headers = {
        'ngrok-skip-browser-warning': 'any_value',
        'Authorization': `Bearer ${token}`
      };
    }
    return axios.get(apiPath+`users/profile/${nickname}`,
    {
      headers: headers,
    }
    )
}

