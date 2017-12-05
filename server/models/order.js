import BittrexExchange from '../exchanges/bittrex'

module.exports = function (Order) {
  Order.getOrders = (cb) => {
    const bitrexOpts = Order.app.get('bittrex')
    const exchange = new BittrexExchange(bitrexOpts)

    exchange.getOrders((err, data) => {
      if (err) {
        cb(err)
      }

      cb(null, data)
    })
  }

  Order.remoteMethod('getOrders', {
    http: { verb: 'get', path: '/' },
    returns: {type: 'array', root: true}
  })
}
