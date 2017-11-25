import BaseApi from './base'

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
  markets() {
    return this.get('public/getmarkets')
      .then((data) => data.result)
      .then((data) => data.filter((market) => market.IsActive))
      .then((data) =>
        data.map((market) => ({
          key: market.MarketName.replace('-', ''),
          base: market.BaseCurrency,
          market: market.MarketCurrency,
        }))
      )
  }

  /**
   * Returns an array containing the available bittrex currency symbols.
   *
   * @return {Promise} Axios promise.
   */
  currencies() {
    return this.get('public/getcurrencies')
      .then((data) => data.result)
      .then((data) => data.filter((currency) => currency.IsActive))
      .then((data) => data.map((currency) => currency.Currency))
      // Bittrex already returns currencies sorted, but just in case..
      .then((data) => data.sort())
  }
}

export default Bittrex
