export const resolveFetchedStockInfoData = (data, type) => {
  let output = { info: {}, data: [] }
  const namemap = {
    "2. Symbol": 'symbol', "3. Last Refreshed": 'last_refreshed', "6. Time Zone": 'timezone', "5. Time Zone": 'timezone',
    "1. open": 'o', "2. high": 'h', "3. low": 'l', "4. close": 'c', "5. volume": 'v' 
  }
  for (const i in data["Meta Data"]) {
    if (namemap[i] !== undefined) output.info[namemap[i]] = data["Meta Data"][i]
  }
  for (const i in data[`Time Series (${type})`]) {
    let dataEntry = {}
    for (const j in data[`Time Series (${type})`][i]) {
      if (namemap[j]) dataEntry[namemap[j]] = data[`Time Series (${type})`][i][j]
    }
    dataEntry['s'] = [dataEntry['o'], dataEntry['c']]
    dataEntry['x'] = new Date(i)
    output.data.push(dataEntry)
  }
  return output
}

export const makeDataset = (data) => {
  return {
    datasets: [{
      data: data,
      backgroundColor: (ctx) => {
        if (ctx.raw === undefined) return '#000'
        return ctx.raw.o - ctx.raw.c < 0
          ? "rgba(256,0,0,1)"
          : "rgba(50,256,0,1)";
      },
      borderColor: (ctx) => {
        if (ctx.raw === undefined) return '#000'
        return ctx.raw.o - ctx.raw.c < 0 ? "red" : "green";
      }
    }],
    borderWidth: 0.5,
    borderSkipped: false
  }
}

export const extractQuoteData = (data) => {
  let rdata = data['Global Quote']
  return {
    title: rdata['01. symbol'],
    price: rdata['05. price'],
    change: rdata['09. change'],
    changep: rdata['10. change percent']
  }
} 