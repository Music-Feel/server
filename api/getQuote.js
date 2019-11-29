const axios = require('axios')

const instance = axios.create({
    baseURL: 'https://quote-garden.herokuapp.com/quotes/all',
    headers: {
    "Content-Type": 'application/x-www-form-urlencoded'
    },
})
module.exports = instance

