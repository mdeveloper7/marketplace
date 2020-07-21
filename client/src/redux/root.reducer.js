import { combineReducers } from 'redux'
import auth from './auth/auth.reducer'
import app from './app/app.reducer'
const rootReducer = combineReducers({
  auth,
  app
})

export default rootReducer
