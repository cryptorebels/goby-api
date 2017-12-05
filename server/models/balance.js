import fixtures from '../fixtures/balances.json'

module.exports = function (Balance) {
  Balance.getBalances = (cb) => {
    cb(null, fixtures)
  }

  Balance.remoteMethod('getBalances', {
    http: { verb: 'get', path: '/' },
    returns: {type: 'array', root: true}
  })
}
