import BittrexExchange from '../exchanges/bittrex'

module.exports = function (Balance) {
  Balance.getBalances = (cb) => {
    const bitrexOpts = Balance.app.get('bittrex')
    const exchange = new BittrexExchange(bitrexOpts)

    exchange.getBalances((err, data) => {
      if (err) {
        cb(err)
      }

      cb(null, data)
    })
  }

  Balance.remoteMethod('getBalances', {
    http: { verb: 'get', path: '/' },
    returns: {type: 'array', root: true}
  })
}
