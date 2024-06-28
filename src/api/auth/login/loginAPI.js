import axios from 'axios'
import React from 'react'
import { apiPath } from '../../endpoint'

export const loginAPI = (email,password) => {
    console.log("2"+email,password)
  return (
    axios.post(apiPath + 'auth/authenticate', {
        email: email,
        password: password
        })
  )
}

export const googleOauth2API = (credential) => {
  return (
    axios.post(apiPath + 'auth/oauth2/login', {
      tokenId: credential
    })
  )
}