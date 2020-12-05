const Influx = require('influx')

const config = {
    host: "localhost",
    database: "stock_bot",
    schema: [
        {
            measurement: "aggregate",
            fields: {
                multiplier: Influx.FieldType.INTEGER,
                open: Influx.FieldType.FLOAT,
                close: Influx.FieldType.FLOAT,
                high: Influx.FieldType.FLOAT,
                low: Influx.FieldType.FLOAT,
                volume: Influx.FieldType.INTEGER,
                vw: Influx.FieldType.FLOAT
            },
            tags: [
                'ticker',
                'timespan'
            ],
        },
    ]
}

module.exports = config