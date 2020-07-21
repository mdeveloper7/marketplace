import { fork, all } from 'redux-saga/effects'

import auth from './auth/auth.sagas'
import app from './app/app.sagas'

export default function * () {
  yield all([
    yield fork(auth),
    yield fork(app)])
}
