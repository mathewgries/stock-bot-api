const Influx = require('influx')
const influx = require('../repository/database')

/**
 * Basic write to database
 * no response returned, so we create our own
 * @param {*} req 
 */
const writeAggData = async (data) => {
    return await influx
        .writePoints(data)
        .then(() => {
            return {
                response: { status: "OK", statusCode: 201 }
            }
        })
        .catch((err) => {
            console.error(`Error saving data to InfluxDB! ${err.stack}`);
        });
}

module.exports = {
    writeAggData
}