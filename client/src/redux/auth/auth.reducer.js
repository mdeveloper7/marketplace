import {
  SIGN_IN,
  SIGN_IN_ERROR,
  SIGN_IN_OK
} from './auth.types'

const INITIAL_STATE = {
  isLoading: false,
  me: null,
  isStore: false,
  error: null,
  isAuthenticated: false
}

const authReducer = (state = INITIAL_STATE, action) => {
  const { type, payload, error } = action
  switch (type) {
    case SIGN_IN: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case SIGN_IN_ERROR: {
      return {
        ...state,
        isLoading: false,
        error
      }
    }
    case SIGN_IN_OK: {
      const { isStore, me } = payload
      return {
        ...state,
        error: false,
        isStore,
        me,
        isAuthenticated: true,
        isLoading: false
      }
    }
    default: {
      return state
    }
  }
}

export default authReducer
