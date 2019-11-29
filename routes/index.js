const router = require('express').Router()
const orderRouter = require('./orderRouter')
const userRouter = require('./userRouter')
const ongkirRouter = require('./ongkirRouter');

router.use('/',userRouter)
router.use('/order',orderRouter)
router.use('/data-ongkir',ongkirRouter)

module.exports = router