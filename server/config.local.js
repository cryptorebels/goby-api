module.exports = {
  port: process.env.PORT || 3000,
  bittrex: {
    apikey: process.env.BITTREX_KEY || '',
    apisecret: process.env.BITTREX_SECRET || '',
  }
}
