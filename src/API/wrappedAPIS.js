import { api_getAlphaVantageData } from "./axios"

/*
 *@return [overview, quote, news, intraday, daily, weekly, monthly]
*/
export const getStockInfos = (symbol) => {
  return Promise.all([
    // api_getAlphaVantageData({function:'OVERVIEW',symbol}),
    api_getAlphaVantageData({function:'GLOBAL_QUOTE',symbol}),
    api_getAlphaVantageData({function:'NEWS_SENTIMENT',tickers:symbol,limit:10}),
    api_getAlphaVantageData({function:'TIME_SERIES_INTRADAY',symbol,interval:'15min'}),
    // api_getAlphaVantageData({function:'TIME_SERIES_DAILY_ADJUSTED',symbol}),
    // api_getAlphaVantageData({function:'TIME_SERIES_WEEKLY',symbol}),
    // api_getAlphaVantageData({function:'TIME_SERIES_MONTHLY',symbol}),
  ])
}