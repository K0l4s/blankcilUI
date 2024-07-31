
const initialState = {
    isAuthenticated: localStorage.getItem('access_token') ? true : false,
    // user: null,
    access_token: localStorage.getItem('access_token') || null,
    refresh_token: localStorage.getItem('refresh_token') || null
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isAuthenticated: true,
          // user: action.payload.user,
          access_token: action.payload.access_token,
          refresh_token: action.payload.refresh_token
        };
      case 'LOGOUT':
        return {
          ...state,
          isAuthenticated: false,
          access_token: null,
          refresh_token: null
        };
      default:
        return state;
    
  }};
  
  export default authReducer;
  