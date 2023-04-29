import { useContext } from "react"
import { AuthContext } from "../AuthContext"
import Menu from "../Components/Menu"

const Dashboard = () => {
  const authCtx = useContext(AuthContext)
  return (
    <>
      <Menu />
      <div className="wrapper">
        <p>Welcome, {'Guest'}</p>
        <div className="dashboard-stocks">
          
        </div> 
      </div>
    </>
  )
}

// authCtx.info.displayName

export default Dashboard