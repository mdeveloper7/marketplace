/** External libs */
import { call, put, takeLatest, all } from 'redux-saga/effects'

/** Internal libs */
import { LIFT_APP } from './app.types'
import { LOCAL_STORAGE_KEY } from '/utils/globals'
import { liftAppOk, liftAppError } from './app.actions'
import { signInOk } from '/redux/auth/auth.actions'
import { fetchMe } from '../../api/admin/admin.api'
import { deserializeDataFromStorageOf } from '/utils/storage'
import '../../api/auth/auth.defs'

/**
 * Lift app saga
 * @generator
 */
export function * liftAppAsync ({ payload }) {
  try {
    const identity = deserializeDataFromStorageOf(LOCAL_STORAGE_KEY.IDENTITY)
    if (!identity) {
      yield put(liftAppOk())
      return
    }

    const { isStore } = identity
    let me = null

    if (isStore) {
      me = yield call(fetchMe)
    }
    yield all([
      put(signInOk(me, isStore)),
      put(liftAppOk())
    ])
  } catch (e) {
    yield put(liftAppError(e))
  }
}

export default function * actionWatcher () {
  yield takeLatest(LIFT_APP, liftAppAsync)
}
