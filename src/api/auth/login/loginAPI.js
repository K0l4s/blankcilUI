import axios from 'axios'
import React from 'react'
import { apiPath } from '../../endpoint'
import { useDispatch } from 'react-redux'

export const loginAPI = (email, password) => {
  console.log(email, password)
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