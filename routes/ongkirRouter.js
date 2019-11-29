const router = require('express').Router();
const ongkirController = require('../controllers/ongkirController');

router.get('/provinsi', ongkirController.getProvinsi)
router.get('/kota', ongkirController.getKota)
router.get('/kelurahan', ongkirController.getKelurahan)
router.get('/cekOngkir/:ekspedisi/:origin/:destination', ongkirController.cekOngkir)

module.exports = router