import axios from 'axios'
import log from 'fancy-log'

class BaseApi {
  /**
   * Base API url
   */
  baseurl

  /**
   * Returns the data part of the response in case
   * this is valid. Otherwise it logs the response
   * as an error.
   *
   * @param {object} response Axios response object.
   * @return {object|void} Data object if success, void otherwise.
   */
  parseResponse(response) {
    if (response.statusText === 'OK') {
      return response.data
    }

    log.error(response)
  }

  /**
   * Given an API path, returns the full URL.
   *
   * @param {string} path The API path.
   * @return {string} Full URL.
   */
  url(path) {
    return `${this.baseurl}${path}`
  }

  /**
   * GET method.
   *
   * @param {string} path API path.
   * @param {object} params Params (if any).
   * @return {Promise} Axios promise.
   */
  get(path, params) {
    return axios.get(this.url(path), params).then(this.parseResponse)
  }
}

export default BaseApi
