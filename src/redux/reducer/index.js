import { combineReducers } from 'redux'
import productReducer from './product'
import authReducer from './auth'

const reducer = combineReducers({
  auth: authReducer,
  product: productReducer
})

export default reducer