import http from '../../components/helper/http'
import jwt from 'jwt-decode'

export const register = (email, password) => {
  return async (dispatch) => {
    const params = new URLSearchParams()
    params.append('email', email)
    params.append('password', password)
    try {
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: ''
      })
      const results = await http().post('/auth/register', params)
      dispatch({
        type: 'REGISTER',
        payload: results.data.message
      })
    } catch (err) {
      console.log(err)
      const { message } = err.response.data
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: message
      })
    }
  }
}

export const login = (email, password) => {
  return async (dispatch) => {
    const params = new URLSearchParams()
    params.append('email', email)
    params.append('password', password)
    try {
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: ''
      })
      const results = await http().post('/auth/login', params)
      const token = results.data.results
      const user = jwt(token)
      dispatch({
        type: 'LOGIN',
        payload: token,
        user: user
      })
    } catch (err) {
      console.log(err)
      const { message } = err.response.data
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: message
      })
    }
  }
}

export const signout = () => ({
  type: 'SIGNOUT'
})