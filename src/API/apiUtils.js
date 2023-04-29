export const wrapAlphaVantageQuery = (args) => {
  const queries = []
  for (const k in args) {
    queries.push(`${k}=${args[k]}`)
  }
  const query = `/query?${queries.join('&')}&apikey=04QOPJ94O29H0ZER`// demo
  return query
}