import { call, put, takeLatest } from 'redux-saga/effects'
import { SIGN_IN } from './auth.types'
import { LOCAL_STORAGE_KEY } from '/utils/globals'
import { serializeDataToStorageOf } from '/utils/storage'
import { signIn } from '/api/auth/auth.api'
import { signInOk, signInError } from './auth.actions'
import '/api/auth/auth.defs'

/**
 * Sign in saga
 * @generator
 * @param {object} action
 * @param {AuthUser} action.payload  user input
 */
export function * signInAsync ({ payload }) {
  try {
    const signInRes = yield call(signIn, payload)
    serializeDataToStorageOf(LOCAL_STORAGE_KEY.IDENTITY, signInRes)
    yield put(signInOk(signInRes.me, signInRes.isStore))
  } catch (e) {
    if (e.response && e.response.status === 401) {
      yield put(signInError('Tu email o password son invalidos'))
      return
    }

    if (e.response && e.response.status === 404) {
      yield put(signInError('Tu email o password son invalidos'))
      return
    }
    if (e.response && e.response.status === 403) {
      yield put(signInError('Tu cuenta aún no esta activa verifica tu correo y confirma desde ahi!!!'))
      return
    }
    yield put(signInError(e.message))
  }
}
export default function * actionWatcher () {
  yield takeLatest(SIGN_IN, signInAsync)
}
