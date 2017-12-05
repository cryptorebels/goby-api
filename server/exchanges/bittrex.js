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

  getOrders (market, cb) {
    const options = {}
    if (market) {
      options.market = market
    }

    bittrex.getorderhistory(options, function (data, err) {
      if (err) {
        debug('goby-api:bittrex')('An error getting orderhistory happened')
        return cb(err)
      }

      if (!data) {
        return cb(null, [])
      }

      return cb(null, data.result)
    })
  }

  processOrderHistory (orders) {
    let total = 0
    orders.forEach((order) => {
      const price = (order.Price - order.Commission)
      if (order.OrderType === 'LIMIT_BUY') {
        total += price
      }
      if (order.OrderType === 'LIMIT_SELL') {
        total -= price
      }
    })

    return {
      benfit: total
    }
  }

  getSummary (cb) {
    this.getBalances((err, balances) => {
      if (err) {
        cb(err)
      }

      const orderHistories = []

      balances.forEach((balance) => {
        const balanceSummary = new Promise((resolve, reject) => {
          const market = 'BTC-' + balance.Currency
          this.getOrders(market, (err, data) => {
            if (err) {
              return reject(err)
            }

            if (!data) {
              return resolve()
            }

            return resolve({
              exchange: market,
              benfit: this.processOrderHistory(data).benfit
            })
          })
        })

        orderHistories.push(balanceSummary)
      })

      Promise.all(orderHistories)
        .then((result) => {
          cb(null, result)
        })
        .catch((err) => {
          cb(err)
        })
    })
  }
}
