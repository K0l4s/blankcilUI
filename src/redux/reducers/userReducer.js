// reducers/userReducer.js

const initialState = {
  profile: {
    fullname: '',
    gender: '',
    dob: '',
    username: '',
    avatar: '',
    cover: '',
  }
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PROFILE':
        return {
          ...state,
          profile: action.payload.profile,
        };
      case 'UPDATE_PROFILE':
        return {
          ...state,
          profile: {
            ...state.profile,
            ...action.payload.profile,
          },
        };
      case 'REMOVE_PROFILE':
        return {
          ...state,
          profile: {
            fullname: '',
    gender: '',
    dob: '',
    username: '',
    avatar: '',
    cover: '',
  }
  };
      default:
        return state;
    }
  };
  
  export default userReducer;
  