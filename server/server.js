import loopback from 'loopback'
import boot from 'loopback-boot'
import crons from './crons'

const app = module.exports = loopback()

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started')
    const baseUrl = app.get('url').replace(/\/$/, '')
    console.info('Web server listening at: %s', baseUrl)
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath
      console.info('Browse your REST API at %s%s', baseUrl, explorerPath)
    }
  })
}

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.start()
    crons.init(app)
  }
})

export default app
