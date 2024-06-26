// Use axios write a function to get data from server
 import axios from 'axios'
import React from 'react'
import { apiPath } from '../../endpoint'
 
 export const registerAPI = (body) => {
  console.log(body)
   return (
     axios.post(apiPath + 'auth/register',body, {
         headers: {
            'Content-Type': 'application/json',
            // Xử lý CORS Block
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
            'Access-Control-Allow-Credentials': 'true'
         }
      }
     )
   )
 }
 