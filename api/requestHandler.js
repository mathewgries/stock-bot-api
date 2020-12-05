const fetch = require('node-fetch')

const key = 'eCahHWlyNG0rOGbTSDjy_rG0tV1_2MQ7'
const url = 'https://api.polygon.io'

async function requestHandler(uri) {
    try {
        const response = await fetch(
            `${url}${uri}apiKey=${key}`,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch Error', error);
    }
}

module.exports = requestHandler