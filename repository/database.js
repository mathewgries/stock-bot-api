/**
 *  INFLUX DATABSE
 *  npm install influx
 *  The object used to make calls to the influx database
 */
const Influx = require('influx')
const config = require('./db-config')

/**
 *  imported in ./repository/query and write files
 *  const influx = require('../repository/database')
 */
module.exports = new Influx.InfluxDB(config);