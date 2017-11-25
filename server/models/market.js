import _ from 'lodash'
import api from '../apis'

export const updateMarkets = (Market) => {
  api.markets({ active: true }).then((markets) => {
    _.each(markets, (market) => {
      Market.upsert(market, (err) => {
        if (err) {
          console.error(err)
        }
      })
    })
  })
}

export default () => {}
