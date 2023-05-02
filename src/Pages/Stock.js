import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { extractQuoteData, makeDataset, resolveFetchedStockInfoData } from "../Utils/StockUtils"
import Menu from "../Components/Menu"
import CandleStickChart from "../Components/Chart/CandleStickChart"
import { getStockInfos } from "../API/wrappedAPIS"
import { Favorite, FavoriteBorder } from "@mui/icons-material"
import { AuthContext } from "../AuthContext"
import { CircularProgress } from "@mui/material"
import { TwitterShareButton, FacebookShareButton, FacebookIcon, TwitterIcon } from "react-share"
import { StockMap } from "../Utils/StockMap"

const NewsBlock = ({data}) => {
  return (
    <a href={data.url} target="_blank" rel="noopener noreferrer">
      <div className="news-wrapper">
        <div className="news-img">
          <img src={data.banner_image} />
        </div>
        <div className="news-body">
          <div className="news-title">{data.title}</div>
          <div className="news-summary">{data.summary}</div>
        </div>
      </div>
    </a>
  )
}

const Stock = () => {
  const { symbol } = useParams()
  const [data, setData] = useState({info: {}, data: []})
  const [overview, setOverview] = useState({title:'', price: '', change: '', changep: ''})
  const [news, setNews] = useState([])
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  // console.log(decodeURI(symbol))
  useEffect(() => {
    getStockInfos(decodeURI(symbol)).then((res) => {
      // console.log(res)
      let news = res[1].feed? res[1].feed.slice(0, 10) : []
      setOverview(extractQuoteData(res[0]))
      setNews(news)
      setData(resolveFetchedStockInfoData(res[2], '15min'))
      setLoading(false)
    }).catch((error) => {
      // console.log(error)
      alert(`Error: API request limit exceeded!\nRedirect to dashboard`)
      navigate('/dashboard')
    })
  }, [])

  const handleFavoriteOnClick = () => {
    if (authContext.curWatchList.includes(decodeURI(symbol))) {
      authContext.removeFromWatchList(decodeURI(symbol))
    } else {
      authContext.addToWatchList(decodeURI(symbol))
    }
  }

  return loading ? 
    (<div className="loading"><CircularProgress /></div>) : 
    (<>
      <Menu />
      <div className="stock-wrapper">
        <div className="stock-header">
          <div className="stock-title">{overview.title}</div>
          <div className="stock-company-name">{StockMap[decodeURI(symbol)]}</div>
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
          <div className="act-icon favorite" onClick={handleFavoriteOnClick}>{authContext.curWatchList.includes(decodeURI(symbol))? (<Favorite />):(<FavoriteBorder />)}</div>
          <FacebookShareButton className="share-icon" url={`https://sean-s8-hiring-challenge.web.app/stock-price/${decodeURI(symbol)}`}><FacebookIcon size={50} round /></FacebookShareButton>
          <TwitterShareButton className="share-icon" url={`https://sean-s8-hiring-challenge.web.app/stock-price/${decodeURI(symbol)}`}><TwitterIcon size={50} round /></TwitterShareButton>
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