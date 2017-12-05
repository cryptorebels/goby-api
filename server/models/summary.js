import BittrexExchange from '../exchanges/bittrex'

module.exports = function (Summary) {
  Summary.getSummarys = (cb) => {
    const bitrexOpts = Summary.app.get('bittrex')
    const exchange = new BittrexExchange(bitrexOpts)

    exchange.getSummary((err, data) => {
      if (err) {
        cb(err)
      }

      cb(null, data)
    })
  }

  Summary.remoteMethod('getSummarys', {
    http: { verb: 'get', path: '/' },
    returns: {type: 'array', root: true}
  })
}
