/** External libs */
import React, { lazy, Suspense } from 'react'
import { Route, Switch, useLocation, Redirect } from 'react-router-dom'
import { RiDashboardLine, RiArchiveDrawerLine, RiQrCodeLine, RiBarChartBoxLine, RiStore2Line } from 'react-icons/ri'

/** Styles */
import { AdminContainer, LeftNav, ContentContainer, LeftNavItem, NavItemIcon, NavItemTitle } from './admin.styles'
import { APP_ROUTES } from '/utils/globals'

/** Components */
import AnimatedRoute from '/components/animated-route/animated-route.component'
import Spinner from '/components/spinner/spinner.component'

/** Sub pages */
const NoMatch = lazy(() => import('/pages/no-match/no-match.component'))
const MyStore = lazy(() => import('/pages/my-store/my-store.component'))

/** Constants */
const navItems = [
  {
    navTitle: 'Dashboard',
    href: APP_ROUTES.DASHBOARD,
    icon: <RiDashboardLine />
  },
  {
    navTitle: 'Categorias',
    href: APP_ROUTES.CATEGORIES,
    icon: <RiArchiveDrawerLine/>
  },
  {
    navTitle: 'Productos',
    href: APP_ROUTES.PRODUCTS,
    icon: <RiQrCodeLine/>
  },
  {
    navTitle: 'Ventas',
    href: APP_ROUTES.SALES,
    icon: <RiBarChartBoxLine/>
  },
  {
    navTitle: 'Mi Tienda',
    href: APP_ROUTES.MY_STORE,
    icon: <RiStore2Line />
  }
]

const Admin = () => {
  const location = useLocation()

  return (
    <AdminContainer>
      <LeftNav >
        {navItems.map((item, i) => {
          console.log(item.href)
          return (
            <LeftNavItem key={i} to={item.href}>
              <NavItemIcon>{item.icon}</NavItemIcon>
              <NavItemTitle>{item.navTitle}</NavItemTitle>
            </LeftNavItem>
          )
        })}
      </LeftNav>
      <ContentContainer>
        <Suspense fallback={<Spinner asPage/>}>
          <Switch location={location}>
            <Route path={APP_ROUTES.ADMIN} exact>
              <Redirect to={APP_ROUTES.DASHBOARD} />
            </Route>
            <Route path={APP_ROUTES.DASHBOARD}>
              <AnimatedRoute>
                <h1>Dashboard</h1>
              </AnimatedRoute>
            </Route>
            <Route path={APP_ROUTES.CATEGORIES}>
              <AnimatedRoute>
                <h1>Categorias</h1>
              </AnimatedRoute>
            </Route>
            <Route path={APP_ROUTES.PRODUCTS}>
              <AnimatedRoute>
                <h1>Productos</h1>
              </AnimatedRoute>
            </Route>
            <Route path={APP_ROUTES.SALES}>
              <AnimatedRoute>
                <h1>Ventas</h1>
              </AnimatedRoute>
            </Route>
            <Route path={APP_ROUTES.MY_STORE}>
              <AnimatedRoute>
                <MyStore />
              </AnimatedRoute>
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Suspense>
      </ContentContainer>
    </AdminContainer>
  )
}

export default Admin
