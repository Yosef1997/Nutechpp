const initialState = {
  token: null,
  user: null,
  message: '',
  errorMsg: ''
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER': {
      return {
        ...state,
        message: action.payload
      }
    }
    case 'LOGIN': {
      return {
        ...state,
        token: action.payload,
        user: action.user
      }
    }
    case 'SET_AUTH_MESSAGE': {
      return {
        ...state,
        message: '',
        errorMsg: action.payload
      }
    }
    case 'SIGNOUT': {
      return {
        ...state,
        token: null,
        message: '',
        errorMsg: ''
      }
    }
    default:
      return { ...state }
  }
}

export default authReducer
