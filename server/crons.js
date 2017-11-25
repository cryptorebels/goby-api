import { CronJob } from 'cron'
import { updateMarkets } from './models/market'

let app = null

const init = (mainApp) => {
  app = mainApp
}

const marketsUpdate = new CronJob({
  cronTime: '* * */12 * * *',
  onTick: () => {
    updateMarkets(app.models.market)
  },
  start: true,
})

export default {
  marketsUpdate,
  init,
}
