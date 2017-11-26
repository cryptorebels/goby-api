import _ from 'lodash'

// Note! We can't use bind here with an es6 function (declared using const)
// otherwise the `this` keyword won't be available.
function updateMarkets(markets = []) {
  const keys = _.map(markets, (market) => market.key)
  const conditions = _.map(keys, (key) => ({ key }))
  let result = markets

  this.find({ where: {or: conditions}}, (err, data) => {
    if (err) {
      return console.error(err)
    }

    _.each(data, (market) => {
      const current = _.find(markets, { key: market.key })
      result = _.filter(result, (mark) => mark.key === market.key)
      market.updateAttributes(current)
    })

    _.each(result, (market) => {
      this.create(market, (err, obj) => {
        if (err) {
          console.error(err)
        }
        console.info('New market saved:', obj)
      })
    })
  })
}

export default (Market) => {
  Market.updateMarkets = updateMarkets.bind(Market)
}
