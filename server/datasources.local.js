module.exports = {
  db: {
    connector: 'mongodb',
    hostname: process.env.DB_HOST || 'db',
    port: process.env.DB_PORT || 27017,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB || 'forms-master',
  },
}
