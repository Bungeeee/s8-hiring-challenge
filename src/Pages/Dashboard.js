import { useContext } from "react"
import { AuthContext } from "../AuthContext"
import Menu from "../Components/Menu"
import { Link } from "react-router-dom"

const SingleStockSnippet = ({symbol}) => {
  return (
    <Link to={`/stock-price/${symbol}`}>
      <div className="snippet-wrapper">
        <div className="snippet-title">{symbol}</div>
      </div>
    </Link>
  )
}

const Dashboard = () => {
  const defaultStocks = ['AMZN', 'TSLA', 'SNAP', 'INTC', 'PINS', 'SOFI', 'AAPL', 'META', 'MSFT', 'GOOG', 'UBER', 'NVDA']
  const authCtx = useContext(AuthContext)
  return (
    <>
      <Menu />
      <div className="wrapper">
        <div className="welcome-text">Welcome, {authCtx.info.displayName}</div>
        <div className="recommend">Trends Today</div>
        <div className="dashboard-stocks">
          {defaultStocks.map((e) => <SingleStockSnippet symbol={e} />)}
        </div> 
      </div>
    </>
  )
}

// authCtx.info.displayName

export default Dashboard