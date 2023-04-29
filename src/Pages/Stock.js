import { useState } from "react"
import { useParams } from "react-router-dom"
import { extractQuoteData, makeDataset, resolveFetchedStockInfoData } from "../Utils/StockUtils"
import Menu from "../Components/Menu"
import CandleStickChart from "../Components/Chart/CandleStickChart"
import { getStockInfos } from "../API/wrappedAPIS"

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

  useState(() => {
    getStockInfos(symbol).then((res) => {
      console.log(res)
      setOverview(extractQuoteData(res[0]))
      setNews(res[1].feed.slice(0, 10))
      setData(resolveFetchedStockInfoData(res[2], '15min'))
    })
  }, [])

  return (
    <>
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
        <div className="stock-inst-intro">
          {/*Leave for empty first*/}
        </div>
        <div className="stock-rec-news">
          <div className="block-title">News</div>
          <div className="block-news">
            {news.map((e) => <NewsBlock data={e} />)}
          </div>
        </div>
      </div>
    </>
  )
}

export default Stock