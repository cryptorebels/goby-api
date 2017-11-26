import app from '../server'

import { market } from '../../utils.spec'

describe('models::market', () => {
  describe('updateMarkets()', () => {
    it('should add markets', () => {
      // const lite = market()
      // const monero = market({name: 'Monero', key: 'BTC-XMR'})

      // const markets = [lite, monero]

      // // updateMarkets(markets)

      console.log(app.models.Market.find())
    })

    it('should update existing markets', () => {

    })

    it('should not duplicate markets when updating', () => {

    })
  })
})
