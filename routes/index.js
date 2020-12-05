/**
 *  Export routes for ease of access in app.js
 *  app.use('/', array())
 */
const timesRoute = require('./times')
const chartdata = require('./chartdata')

module.exports = [
    timesRoute,
    chartdata
]