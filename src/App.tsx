/* eslint-disable react/react-in-jsx-scope */

import useRouteElement from './useRouteElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routeElement = useRouteElement()

  return (
    <>
      <div>{routeElement}</div>
      <ToastContainer />
    </>
  )
}

export default App
