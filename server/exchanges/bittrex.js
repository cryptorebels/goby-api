import bittrex from 'node-bittrex-api'

module.exports = class BittrexExchange {
  constructor (bitrexOpts) {
    this.bittrexOps = bitrexOpts
    bittrex.options(bitrexOpts)
  }

  getBalances (cb) {
    bittrex.getbalances(function (data, err) {
      if (err) {
        cb(err)
      }

      cb(null, data.result)
    })
  }

  getOrders (market, cb) {
    const options = {}
    if (market) {
      options.market = market
    }
    bittrex.getorderhistory(options, function (data, err) {
      if (err) {
        cb(err)
      }

      return cb(null, data)
    })
  }
}
