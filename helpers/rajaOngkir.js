'use strict';

const axios = require('axios');
const request_token = process.env.RAJA_ONGKIR_TOKEN

class RajaOngkir {
    constructor() {
        this.apiRequest = axios.create({
            baseURL: 'https://pro.rajaongkir.com/api/',
            headers: {
                key: request_token
            }
        })
    }

    get(url, params) {
        return this.apiRequest.get(url, params)
    }

    post(url, params) {
        return this.apiRequest.post(url, params)
    }

    delete(url, params) {
        return this.apiRequest.delete(url, params)
    }
}

module.exports = RajaOngkir;