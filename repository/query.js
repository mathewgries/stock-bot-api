/**
 *  Basic Database SELECT calls
 */
const Influx = require('influx')
const influx = require('../repository/database')
const os = require("os");

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
const getQuery = () => {
    return `select * from response_times 
            order by time desc
            limit 10`
}

/**
 *  Basic select call to influx db
 *  Uses query variable above in Influx.query()
 *  Called in route.get in ../routes/times.js
 *  @param {*} res 
 */
const getResponseTimes = async (res) => {
    return await influx.query(getQuery())
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
const getDatabases = (app) => {
    influx
        .getDatabaseNames()
        .then((names) => {
            if (!names.includes("express_response_db")) {
                console.log('create database')
                return influx.createDatabase("express_response_db");
            }
        })
        .catch((err) => {
            console.error(`Error creating Influx database!`);
        });
}

module.exports = {
    getDatabases,
    getResponseTimes
}
