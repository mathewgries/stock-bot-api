/**
 *  INFLUX DATABSE
 *  npm install influx
 *  The object used to make calls to the influx database
 */
const Influx = require('influx')


/**
 *  Example set up taken from:
 *  https://github.com/node-influx/node-influx/blob/master/examples/express_response_times/app.js
 *  line 20 at the time of publishing this file
 */
const host = "localhost"
const database = "express_response_db"
const schema = [
    {
        measurement: "response_times",
        fields: {
            path: Influx.FieldType.STRING,
            duration: Influx.FieldType.INTEGER,
        },
        tags: ["host"],
    },
]

/**
 *  imported in ./repository/query and write files
 *  const influx = require('../repository/database')
 */
module.exports = new Influx.InfluxDB({
    host,
    database,
    schema
});