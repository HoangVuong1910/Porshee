/* eslint-disable react/react-in-jsx-scope */

import { useContext, useEffect } from 'react'
import useRouteElement from './useRouteElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'

function App() {
  const routeElement = useRouteElement()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearDataLocalStorage', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearDataLocalStorage', reset)
    }
  }, [reset])
  return (
    <>
      <div>{routeElement}</div>
      <ToastContainer />
    </>
  )
}

export default App
