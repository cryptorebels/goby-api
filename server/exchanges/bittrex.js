import bittrex from 'node-bittrex-api'
import debug from 'debug'

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

  getOrders (cb) {
    bittrex.getorderhistory({}, function (data, err) {
      if (err) {
        cb(err)
      }

      return cb(null, data)
    })
  }
}
