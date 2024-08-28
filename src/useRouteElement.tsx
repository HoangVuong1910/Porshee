/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { lazy, useContext, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'

import { AppContext } from './contexts/app.context'
import path from './constants/path'
import CartLayout from './layouts/CartLayout'
import UserLayout from './pages/User/layouts'
import Loading from './components/Loading'

const Login = lazy(() => import('./pages/Login'))
const ProductList = lazy(() => import('./pages/ProductList'))
const Profile = lazy(() => import('./pages/User/pages/Profile'))
const Register = lazy(() => import('./pages/Register'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const ChangePassword = lazy(() => import('./pages/User/pages/ChangePassword'))
const HistoryPurchase = lazy(() => import('./pages/User/pages/HistoryPurchase'))
const NotFound = lazy(() => import('./pages/NotFound'))
const loading = () => <Loading />

type LoadComponentProps = {
  component: React.LazyExoticComponent<() => JSX.Element>
  mode?: string
}

const LoadComponent = ({ component: Component, mode }: LoadComponentProps) => {
  return (
    <Suspense fallback={loading()}>
      {/* @ts-expect-error */}
      <Component mode={mode} />
    </Suspense>
  )
}

// const isAuthenticated = false
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

function RejectedRoute() {
  // const isAuthenticated = false
  const { isAuthenticated } = useContext(AppContext)

  return !isAuthenticated ? <Outlet /> : <Navigate to={'/'} />
}

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <LoadComponent component={Login} />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <LoadComponent component={Register} />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <LoadComponent component={Cart} />
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <LoadComponent component={Profile} />
            },
            {
              path: path.changePassword,
              element: <LoadComponent component={ChangePassword} />
            },
            {
              path: path.historyPuchase,
              element: <LoadComponent component={HistoryPurchase} />
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.productDetail,
          element: (
            <MainLayout>
              <ProductDetail />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )
    }
  ])
  return routeElement
}
