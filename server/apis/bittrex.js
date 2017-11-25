import BaseApi from './base'

export const filter = (filters, data) => {
  if (!Object.keys(filters).length) {
    return data
  }

  Object.keys(filters).forEach((key) => {
    const value = filters[key]
    data = data.filter((market) => value === market[key])
  })

  return data
}

class Bittrex extends BaseApi {
  /**
   * Bittrex base API URL
   */
  baseurl = 'https://bittrex.com/api/v1.1/'

  /**
   * Returns an array containing the available bittrex markets.
   *
   * @return {array} Of objects containing the markets information.
   */
  markets(filters = {}) {
    return this.get('public/getmarkets')
      .then((data) => data.result)
      .then((data) =>
        data.map((market) => ({
          active: market.IsActive,
          name: market.MarketCurrencyLong,
          key: market.MarketName,
          base: market.BaseCurrency,
          ticker: market.MarketCurrency,
          logo: market.LogoUrl,
        }))
      )
      .then((data) => filter(filters, data))
  }

  /**
   * Returns an array containing the available bittrex currency symbols.
   *
   * @return {Promise} Axios promise.
   */
  currencies() {
    return this.get('public/getcurrencies')
      .then((data) => data.result)
      .then((data) => data.map((currency) => currency.Currency))
      // Bittrex already returns currencies sorted, but just in case..
      .then((data) => data.sort())
  }
}

export default Bittrex
