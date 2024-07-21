// actions/authActions.js
export const loginAction = (access_token,refresh_token) => ({
    type: 'LOGIN',
    payload: { access_token,refresh_token }
  });
  
  export const logout = () => ({
    type: 'LOGOUT'
  });
  