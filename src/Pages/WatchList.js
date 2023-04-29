import { useContext } from "react"
import { AuthContext } from "../AuthContext"
import { Link } from "react-router-dom"
import { Close } from "@mui/icons-material"
import Menu from "../Components/Menu"

const WatchList = () => {
  const authContext = useContext(AuthContext)

  const WatchListItem = ({symbol}) => {
    return (
      <div className="watchlist-item">
        <Link to={`/stock-price/${symbol}`}>
          <div className="watchlist-item-name">{symbol}</div>
        </Link>
        <div className="watchlist-remove" onClick={()=>authContext.removeFromWatchList(symbol)}>
          <Close />
        </div>
      </div>
    )
  }

  return (
    <>
      <Menu />
      <div className="watchlist-header">
        <div className="watchlist-title">Watch List</div>
      </div>
      <div className="watchlist-body">
        {authContext.curWatchList.map((e) => <WatchListItem symbol={e} />)}
      </div>
    </>
  )
}

export default WatchList