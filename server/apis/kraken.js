import BaseApi from './base'

/**
 * Kraken API class.
 */
class Kraken extends BaseApi {
  /**
   * Kraken base API URL
   */
  baseurl = 'https://api.kraken.com/0/'

  /**
   * Kraken API returns currencies uglified, so we clean them
   * up before saving in memory.
   *
   * @param {string} currency Currency to be cleaned up.
   * @return {string} Proper currency.
   */
  cleanUpCurrency(currency) {
    return currency.replace(/(^[Z|X])?(\.d$)?/, '')
  }

  /**
   * Returns an array containing the markets available in kraken.
   *
   * @return {array} Of objects containing the markets information.
   */
  markets() {
    return this.get('public/AssetPairs')
      .then((data) => data.result)
      .then((data) => Object.keys(data).map((market) => ({
        key: data[market].altname,
        base: this.cleanUpCurrency(data[market].base),
        market: this.cleanUpCurrency(data[market].quote),
      })))
  }

  /**
   * Returns an array containing the available kraken currency symbols.
   *
   * @return {Promise} Axios promise.
   */
  currencies() {
    return this.get('public/Assets')
      .then((data) => data.result)
      .then((data) => Object.keys(data).map((currency) =>
        data[currency].altname
      ))
      .then((data) => data.sort())
  }
}

export default Kraken
