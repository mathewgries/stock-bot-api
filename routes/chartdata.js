const express = require('express')
const router = express.Router()
const cors = require('../server/cors-config')
const data = require('../repository')
const { getChartData } = require('../api/get')

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

router.get('/chartdata', cors, asyncHandler(async(req,res) => {
    const results = await data.getAggData('aggregate')
    res.json(results)
}))

router.post('/chartdata', cors, asyncHandler(async (req, res) => {
    const chartData= await getChartData(req.body)
    const writeData = chartData.results.map((data) => {
        return {
            measurement: "aggregate",
            timestamp: new Date(data.t),
            fields: {
                multiplier: req.body.multiplier,
                open: data.o,
                close: data.c,
                high: data.h,
                low: data.l,
                volume: data.v,
                vw: data.vw,
            },
            tags: {
                ticker: req.body.ticker,
                timespan: req.body.timespan
            }
        }
    })
    const response = await data.writeAggData(writeData)
    res.json(response)
}))

module.exports = router