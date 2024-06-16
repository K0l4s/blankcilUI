import axios from 'axios'
import React from 'react'
import { apiPath } from '../endpoint';

export const getAllConversationByToken = async() => {
    const token = localStorage.getItem('access_token');
  return await axios.get(apiPath+'conversation/all', {
    headers: {
      'ngrok-skip-browser-warning': 'any_value',
        'Authorization': `Bearer ${token}`
    }
  })
  
}

export const getConversationById = async(conversationId) => {
    const token = localStorage.getItem('access_token');
  return await axios.get(apiPath+'conversation/chat/'+conversationId, {
    headers: {
      'ngrok-skip-browser-warning': 'any_value',
        'Authorization': `Bearer ${token}`
    }
  })
  
}

export const sendMesage = async(conversationId, message) => {
    const token = localStorage.getItem('access_token');
    const data = {
      "chatId": conversationId,
      "content": message
    }
  return await axios.post(apiPath+'conversation/chat', data, {
    headers: {
      'ngrok-skip-browser-warning': 'any_value',
      'Authorization': `Bearer ${token}`
    }
  })
  
}
