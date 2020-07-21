import { LIFT_APP, LIFT_APP_ERROR, LIFT_APP_OK } from './app.types'

export const liftApp = () => {
  return {
    type: LIFT_APP
  }
}

export const liftAppOk = () => {
  return {
    type: LIFT_APP_OK
  }
}

export const liftAppError = error => {
  return {
    type: LIFT_APP_ERROR,
    error
  }
}
