/** External libs */
import React, { useEffect, useState } from 'react'
/** Internal libs */
import { useSelector } from 'react-redux'
import history from '/utils/history'
import { APP_ROUTES } from '/utils/globals'

/** Components */
import Spinner from '/components/spinner/spinner.component'

/** @component ProtectedRoute
 * @returns {React.ReactNode}
 */
const ProtectedRoute = ({ storeOnly, children }) => {
  const [isVerified, setIsVerified] = useState(false)
  const { isAuthenticated, isStore, me } = useSelector(state => state.auth)

  async function verify () {
    if (!isAuthenticated) {
      history.replace(APP_ROUTES.SIGN_IN)
      return
    }
    if (storeOnly && !isStore) {
      history.replace(APP_ROUTES.SIGN_IN)
      return
    }
    setIsVerified(true)
  }

  useEffect(() => {
    verify()
  }, [])

  if (isVerified) {
    return children
  } else {
    return <Spinner asPage/>
  }
}

export default ProtectedRoute
