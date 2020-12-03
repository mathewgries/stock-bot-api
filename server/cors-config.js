/**
 *  SET CORS
 *  Policies to allow client requests
 */
const cors = require('cors')

const origin = 'http://localhost:3000'
const optionsSuccessStatus = 200

module.exports = cors({
    origin,
    optionsSuccessStatus
})