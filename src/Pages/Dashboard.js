import { useContext } from "react"
import { AuthContext } from "../AuthContext"
import Menu from "../Components/Menu"
import { Link } from "react-router-dom"
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch';
import { AutoComplete } from "../Components/AutoComplete";
import insightCliet from 'search-insights'
import Alogolia from '../Images/algolia.png'

insightCliet('init', {
  appId: 'FUTA7N5APY',
  apiKey: '8640d8b28c924bad04a24aa3dc3a1241'
})
insightCliet('setUserToken', 'user11111')

const searchClient = algoliasearch('FUTA7N5APY', '18b7ee096ee39f7251eb4d2b7024308c');
// If you include Insights in your HTML,
// comment out the following line


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
        <div className="search-title">Find Your Interest</div>
        <AutoComplete searchClient={searchClient} />
        <div className="brand-declaration">Search powered by algolia <span><img src={Alogolia}/></span></div>
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