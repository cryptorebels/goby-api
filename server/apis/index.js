import Kraken from './kraken'
import Bittrex from './bittrex'
import Bitfinex from './bitfinex'

/**
 * API middleware.
 */
class API {
  /**
   * The currently working engine
   */
  engine = null

  /**
   * All the available APIs.
   */
  apis = {
    kraken: new Kraken(),
    bittrex: new Bittrex(),
    bitfinex: new Bitfinex(),
  }

  /**
   * Changes the current API engine to be used.
   *
   * @param {string} engine The engine to be used (lowercase)
   * @return {this} For chaining.
   */
  change(engine) {
    this.engine = this.apis[engine]

    return this
  }

  /**
   * Sets the default engine on init.
   *
   * @param {string} engine The engine to be used (lowercase)
   * @return {void}
   */
  constructor(engine = 'bittrex') {
    this.change(engine)
  }
}

const api = new API()

// Proxyfy. This makes all the methods from the currently loaded engine
// directly available into the API middleware.
export default new Proxy(api, {
  get: (target, name) => {
    if (name in api.engine) {
      return api.engine[name]
    }
  },
})
