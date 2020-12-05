/**
 *  Basic Database SELECT calls
 */
const Influx = require('influx')
const influx = require('../repository/database')
const config = require('./db-config')

/**
 *  Basic query
 *  with where clause
 *  "limit" is similar to MSSQL "TOP" key word
 */
// const getQuery = () => {
//     return `select * from response_times 
//             where host = ${Influx.escape.stringLit(os.hostname())}
//             order by time desc
//             limit 10`
// }

/**
 *  Basic query string
 *  No where clause
 *  "limit" is similar to MSSQL "TOP" key word
 */
const getQuery = (measurement) => {
    return `select * from ${measurement}
            order by time desc
            limit 10`
}

/**
 *  Basic select call to influx db
 *  Uses query variable above in influx.query()
 *  Called in route.get in ../routes/times.js
 *  @param {*} res 
 */
const getAggData = async (measurement) => {
    return await influx.query(getQuery(measurement))
        .then((result) => {
            return result;
        })
        .catch((err) => {
            res.status(500).send(err.stack);
        });
}

/**
 *  Check if database exists
 *   If not, create database
 *  Currently not in use in the app
 *  can be called in app.js to set up a db
 *  Will use schema in ..repository/datbase.js
 *  @param {*} app 
 */
const getDatabases = () => {
    influx
        .getDatabaseNames()
        .then((names) => {
            if (!names.includes(config.database)) {
                console.log(`create database: ${config.database}`)
                console.log(config)
                return influx.createDatabase(config.database);
            }
        })
        .catch((err) => {
            console.error(`Error: could not create ${config.database}!`);
        });
}

module.exports = {
    getDatabases,
    getAggData
}
