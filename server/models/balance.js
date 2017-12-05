import bittrex from 'node-bittrex-api'

module.exports = function (Balance) {
  Balance.getBalances = (cb) => {
    const bittrexOpts = Balance.app.get('bittrex')
    bittrex.options(bittrexOpts)

    bittrex.getbalances(function (data, err) {
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
