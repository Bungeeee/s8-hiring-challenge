import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { extractQuoteData, makeDataset, resolveFetchedStockInfoData } from "../Utils/StockUtils"
import Menu from "../Components/Menu"
import CandleStickChart from "../Components/Chart/CandleStickChart"
import { getStockInfos } from "../API/wrappedAPIS"
import { Favorite, FavoriteBorder, IosShare } from "@mui/icons-material"
import { AuthContext } from "../AuthContext"
import { CircularProgress } from "@mui/material"

const NewsBlock = ({data}) => {
  return (
    <div className="news-wrapper">
      <div className="news-img">
        <img src={data.banner_image} />
      </div>
      <div className="news-body">
        <div className="news-title">{data.title}</div>
        <div className="news-summary">{data.summary}</div>
      </div>
    </div>
  )
}

const Stock = () => {
  const { symbol } = useParams()
  const [data, setData] = useState({info: {}, data: []})
  const [overview, setOverview] = useState({title:'', price: '', change: '', changep: ''})
  const [news, setNews] = useState([])
  const authContext = useContext(AuthContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStockInfos(symbol).then((res) => {
      console.log(res)
      setOverview(extractQuoteData(res[0]))
      setNews(res[1].feed.slice(0, 10))
      setData(resolveFetchedStockInfoData(res[2], '15min'))
      setLoading(false)
    })
  }, [])

  const handleFavoriteOnClick = () => {
    if (authContext.curWatchList.includes(symbol)) {
      authContext.removeFromWatchList(symbol)
    } else {
      authContext.addToWatchList(symbol)
    }
  }

  return loading ? 
    (<div className="loading"><CircularProgress /></div>) : 
    (<>
      <Menu />
      <div className="stock-wrapper">
        <div className="stock-header">
          <div className="stock-title">{overview.title}</div>
          <div className="stock-cur-price" style={{color: (overview.change.includes('-')? 'red':'green')}}>
            {overview.price}
            <span>{(overview.change.includes('-')? '':'+')+overview.change}</span>
          </div>
        </div>
        <div className="stock-graph">
          <CandleStickChart data={makeDataset(data.data)} />
        </div>
        <div className="last-refreshed">Last refreshed: {data.info.last_refreshed}</div>
        <div className="stock-actions">
          <div className="act-icon favorite" onClick={handleFavoriteOnClick}>{authContext.curWatchList.includes(symbol)? (<Favorite />):(<FavoriteBorder />)}</div>
          <div className="act-icon share"><IosShare /></div>
        </div>
        <div className="stock-rec-news">
          <div className="block-title">News</div>
          <div className="block-news">
            {news.map((e) => <NewsBlock data={e} />)}
          </div>
        </div>
      </div>
    </>)
}

export default Stock