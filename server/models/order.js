import BittrexExchange from '../exchanges/bittrex'

module.exports = function (Order) {
  Order.getOrders = (market, cb) => {
    const bitrexOpts = Order.app.get('bittrex')
    const exchange = new BittrexExchange(bitrexOpts)

    exchange.getOrders(market, (err, data) => {
      if (err) {
        cb(err)
      }

      cb(null, data)
    })
  }

  Order.remoteMethod('getOrders', {
    accepts: [
      {arg: 'market', type: 'string'}
    ],
    http: { verb: 'get', path: '/' },
    returns: {type: 'array', root: true}
  })
}
