import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

// import Home from '../Home'
const ProtectedRoute = props => {
  const jwtToken = Cookies.get('jwt_token')

  // if jwtToken is not defined then redirect to login Route
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} /> // else return the Home Route/product Route/cart Route
}

export default ProtectedRoute
