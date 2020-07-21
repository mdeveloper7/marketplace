import {
  LIFT_APP_ERROR,
  LIFT_APP_OK
} from './app.types'

const INITIAL_STATE = {
  liftAppOk: false,
  liftAppError: null
}

const appReducer = (state = INITIAL_STATE, action) => {
  const { type, error } = action
  switch (type) {
    case LIFT_APP_OK: {
      return {
        liftAppOk: true,
        error: null
      }
    }
    case LIFT_APP_ERROR: {
      return {
        liftAppOk: false,
        liftAppError: error
      }
    }
    default: {
      return state
    }
  }
}

export default appReducer
