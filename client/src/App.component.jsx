/** External libs */
import React, { lazy, Suspense, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
/** Internal libs */
import { APP_ROUTES } from '/utils/globals'
import { liftApp } from '/redux/app/app.actions'
/** Components */
import AnimatedRoute from '/components/animated-route/animated-route.component'
import ProtectedRoute from '/components/protected-route/protected-route.component'
import Spinner from '/components/spinner/spinner.component'
/** Pages */
const Home = lazy(() => import('./pages/home/home.component'))
const Admin = lazy(() => import('./pages/admin/admin.component'))
const SignIn = lazy(() => import('/pages/sign-in/sign-in.component'))
const SignUp = lazy(() => import('/pages/sign-up/sign-up.component'))
const NoMatch = lazy(() => import('/pages/no-match/no-match.component'))
const ErrorLayout = lazy(() => import('/pages/error-layout/error-layout.component'))
const ForgotPassword = lazy(() => import('/pages/forgot-password/forgot-password.component'))

function App () {
  const dispatch = useDispatch()
  console.log(location, 'rerender')
  const { liftAppOk, liftAppError } = useSelector(state => state.app)
  useEffect(() => {
    dispatch(liftApp())
  }, [])
  if (liftAppOk) {
    return (
      <Suspense fallback={<Spinner asPage/>}>
        <Switch>
          <Route path={APP_ROUTES.HOME} exact>
            {/* <AnimatedRoute>
              <Home />
            </AnimatedRoute> */}
            <Redirect to={APP_ROUTES.SIGN_IN} />
          </Route>
          <Route path={APP_ROUTES.SIGN_IN}>
            <AnimatedRoute>
              <SignIn />
          </AnimatedRoute>
        </Route>
        <Route path={APP_ROUTES.SIGN_UP}>
          <AnimatedRoute>
            <SignUp />
            </AnimatedRoute>
          </Route>
          <Route path={APP_ROUTES.FORGOT_PASSWORD} >
            <AnimatedRoute>
              <ForgotPassword />
            </AnimatedRoute>
          </Route>
          <Route path={APP_ROUTES.ADMIN}>
            <ProtectedRoute storeOnly>
              <AnimatedRoute>
                <Admin />
              </AnimatedRoute>
            </ProtectedRoute>
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Suspense>
    )
  }
  if (liftAppError) {
    return <ErrorLayout />
  }
  return <Spinner asPage />
}

export default App
