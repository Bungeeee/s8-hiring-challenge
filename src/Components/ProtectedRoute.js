import { useContext } from "react"
import { AuthContext } from "../AuthContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({element}) => {
  const authContext = useContext(AuthContext)
  if (AuthContext.info === null) {
    return <Navigate to='/login' />
  } else {
    return element
  }
}

export default ProtectedRoute