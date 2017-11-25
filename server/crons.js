import { CronJob } from 'cron'
// import api from './apis'

const marketsUpdate = new CronJob({
  cronTime: '*/5 * * * * *',
  onTick: () => {
    // api.markets().then((data) => {
    //   console.log('received data!')
    // })
  },
  start: true,
})

export default {
  marketsUpdate,
}
