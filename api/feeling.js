const axios = require('axios')

const instance = axios.create({
    baseURL: 'https://apis.paralleldots.com',
    headers: {
    "Content-Type": 'application/x-www-form-urlencoded'
    },
})

module.exports = instance