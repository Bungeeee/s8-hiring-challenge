import axios from 'axios'
import { wrapAlphaVantageQuery } from './apiUtils'

const alphaVantage = axios.create({
  baseURL: 'https://www.alphavantage.co'
})

export const api_getAlphaVantageData = async (query) => {
  try {
    const { data } = await alphaVantage.get(wrapAlphaVantageQuery(query))
    return data
  } catch (e) {
    return { error: e }
  }
}