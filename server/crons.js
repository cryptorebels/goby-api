import { CronJob } from 'cron'
import api from './apis'
// import bittrex from 'node-bittrex-api'

const updateMarkets = (app) => {
  api.markets({ base: 'BTC' }).then((markets) => {
    app.models.Market.updateMarkets(markets)
  })
}

const init = (app) => {
  updateMarkets(app)
  new CronJob({
    cronTime: '* * */2 * * *',
    onTick: () => {
      updateMarkets(app)
    },
    start: true,
  })
}

export default {
  init,
}
