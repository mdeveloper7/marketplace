import { SIGN_IN, SIGN_IN_ERROR, SIGN_IN_OK } from './auth.types'

export const signIn = payload => {
  return {
    type: SIGN_IN,
    payload
  }
}

export const signInOk = (me, isStore) => {
  return {
    type: SIGN_IN_OK,
    payload: {
      me,
      isStore
    }
  }
}

export const signInError = error => {
  return {
    type: SIGN_IN_ERROR,
    error: error
  }
}