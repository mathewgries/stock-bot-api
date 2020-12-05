/**
 *  Exports database read/write methods
 */
const { writeAggData } = require('../repository/write')
const {getDatabases, getAggData } = require('../repository/query')

module.exports = {
    writeAggData,
    getAggData,
    getDatabases
}