/**
 *  BASIC ROUTER
 *  Example router for /times endpoint
 */
const express = require('express')
const router = express.Router()

/** 
 *  Add CORS policy to the requests  
 */ 
const cors = require('../server/cors-config')

/** 
 *  Contains methods for accessing database read and writes
 */ 
const data = require('../repository')

/**
 * Handle async functionality for requests
 * @param {*} cb 
 */
function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next)
        } catch (err) {
            next(err)
        }
    }
}

/**
 *  get request - retrieve information from the database
 *  return to the client
 *  See below for client_end fetch example
 */
router.get("/times", cors, asyncHandler(async (req, res) => {
    const results = await data.getResponseTimes(res)
    res.json(results)
}))

/**
 * EXAMPLE FETCH - METHOD: 'GET'
 * This is the method to create in the front end application
 * This calls the above get endpoint, and returns the db records
 * to the front end
 */
// export const get = async () => {
//     return await fetch('http://localhost:3001/times',{
//         method: 'GET',
//         mode: 'cors'
//     })
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((err) => console.error('ERROR: ', err.message))
// }

/**
 *  post request - Save data to the database
 *  not sure if there is a response message with this yet
 *  See below for client_end fetch example
 */
router.post("/times", cors, asyncHandler(async (req, res) => {
    const response = await data.writeResponseTime(req)
    res.json(response)
}))

/**
 * EXAMPLE FETCH - METHOD: 'POST'
 * This is the method to create in the front end application
 * This calls the above endpoint to create a new record in the db
 * 
//  */
// export const post = async () => {
//     const body = {
//         measurement: 'response_times',
//         tags: { host: 'MY_LAPTOP' },
//         fields: { duration: 100, path: '/my_path' },
//     }

//     return await fetch('http://localhost:3001/times', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(body)
//     })
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((err) => console.error('ERROR IN POST: ', err.message))
// }

module.exports = router