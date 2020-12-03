/**
 *  Exports database read/write methods
 */
const { writeResponseTime } = require('../repository/write')
const {getDatabases, getResponseTimes } = require('../repository/query')

module.exports = {
    writeResponseTime,
    getResponseTimes,
    getDatabases
}