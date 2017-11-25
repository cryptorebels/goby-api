import BaseApi from './base'

import { uniq } from '../utils'

class Bitfinex extends BaseApi {
  /**
   * Bitfinex base API URL
   */
  baseurl = 'https://api.bitfinex.com/v1/'

  /**
   * Returns an array containing the available bitfinex markets.
   *
   * @return {array} Of objects containing the markets information.
   */
  markets() {
    return this.get('symbols')
      .then((data) =>
        data.map((result) => {
          const key = result.toUpperCase()
          // Right now bitfinex only has 3 chars currencies.
          // Hopefully they won't change it soon...
          const base = key.substr(0, 3)
          const market = key.substr(3, 3)

          return {
            key,
            base,
            market,
          }
        })
      )
  }

  /**
   * Returns an array containing the available bitfinex currency symbols.
   *
   * Bitfinex does not have a currencies entity, that's why we load the
   * information from their markets entity.
   *
   * @return {Promise} Axios promise.
   */
  currencies() {
    return this.markets()
      .then((markets) => {
        const currencies = []

        // Add both markets
        markets.forEach((market) => {
          currencies.push(market.base)
          currencies.push(market.market)
        })

        // Then remove duplicates
        return uniq(currencies)
      })
      .then((data) => data.sort())
  }
}

export default Bitfinex
