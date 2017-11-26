import { CronJob } from 'cron'
import api from './apis'

const updateMarkets = (app) => {
  api.markets({ active: true, base: 'BTC' }).then((markets) => {
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
