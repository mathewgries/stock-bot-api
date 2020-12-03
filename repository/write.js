const influx = require('../repository/database')

/**
 * Basic write to database
 * request body contains insert object
 * no response returned, so we create our own
 * @param {*} req 
 */
const writeResponseTime = async (req) => {
    return await influx.writePoints([req.body])
        .then(() => {
            return {
                response: {
                    status: "OK",
                    statusCode: 201
                }
            }
        })
        .catch((err) => {
            console.error(`Error saving data to InfluxDB! ${err.stack}`);
        });
}

/**
 *  Basic INSERT body exmaple
 *  request.body sent from client_end fetch POST method
 * used above in:  .writePoints([req.body])
 */
// const body = {
//     measurement: 'response_times',
//     tags: { host: 'MY_CPU' },
//     fields: { duration: 100, path: '/my_path' },
// }

module.exports = {
    writeResponseTime
}