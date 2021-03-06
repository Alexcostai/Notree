const INITIAL_STATE = {
  login:{
    isLogged: false
  },
  user:{
    name: '',
    lastName: '',
    email: '',
  }
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      state.login.isLogged = action.value;
      return { ...state };
    case 'LOAD_PROFILE':
        state.user = action.data;
      return {...state};
    default:
      return { ...state };
  }
}

export default userReducer