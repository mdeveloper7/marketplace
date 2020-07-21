/** External libs */
import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
/** Internal libs */
import rootReducer from './root.reducer'
import rootSaga from './root.saga'

const sagaMiddleware = createSagaMiddleware()
const logger = createLogger({ collapsed: true })

const INITIAL_STATE = {}

const middlewares =
    (process && process.env && process.env.NODE_ENV === 'production')
      ? [sagaMiddleware]
      : [sagaMiddleware, logger]
const store = createStore(
  rootReducer,
  INITIAL_STATE,
  compose(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga)

export default store
