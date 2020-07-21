/** External libs */
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'

/** Internal libs */
import store from '/redux/root.store'
import history from '/utils/history'
import '/utils/api'

/** Global style */
import './index.styles.css'
import 'bootstrap/dist/css/bootstrap.css'

/** Entry component */
import App from './app.component'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
      {/* <React.StrictMode>
        <App />
      </React.StrictMode> */}
    </Router >
  </Provider>,
  document.getElementById('root')
)
