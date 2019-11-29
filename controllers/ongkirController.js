'use strict';

const RajaOngkir = require('../helpers/rajaOngkir');
const ongkir = new RajaOngkir();
const response = {}

class OngkirController {

    static getProvinsi(req, res, next) {
        ongkir.get(`/province/?id=${req.query.id || ''}`)
            .then(({ data }) => {
                response.status = 'success'
                response.provinsi = data.rajaongkir.results
                res.send(response)
            })
            .catch(err => {
                next(err)
            })
    }

    static getKota(req, res, next) {
        ongkir.get(`/city/?province=${req.query.provinsi || ''}&id=${req.query.id || ''}`)
            .then(({ data }) => {
                response.status = 'success'
                response.kota = data.rajaongkir.results
                res.send(response)
            })
            .catch(err => {
                next(err)
            })
    }

    static getKelurahan(req, res, next) {
        ongkir.get(`/subdistrict?city=${req.query.city}`)
            .then(({ data }) => {
                response.status = 'success'
                response.kelurahan = data.rajaongkir.results
                res.send(response)
            })
            .catch(err => {
                next(err)
            })
    }

    static cekOngkir(req, res, next) {
        ongkir.post('/cost', {
            origin: `${req.params.origin}`,
            originType: 'city',
            destination: `${req.params.destination}`,
            destinationType: 'subdistrict',
            weight: 1700,
            courier: `${req.params.ekspedisi}`
        })
            .then(({ data }) => {
                response.status = 'success'
                response.ongkir = data.rajaongkir.results
                res.send(response)
            })
            .catch(err => {
                next(err)
            })
    }





}

module.exports = OngkirController;