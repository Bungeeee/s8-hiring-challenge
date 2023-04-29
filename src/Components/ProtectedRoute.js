import { useContext } from "react"
import { AuthContext } from "../AuthContext"
import { Navigate } from "react-router-dom"
import { CircularProgress } from "@mui/material"

const ProtectedRoute = ({element}) => {
  const authContext = useContext(AuthContext)
  if (!authContext.statusChecking && authContext.info === null) {
    return <Navigate to='/login' />
  } else if (authContext.statusChecking) {
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    )
  } else {
    return element
  }
}

export default ProtectedRoute