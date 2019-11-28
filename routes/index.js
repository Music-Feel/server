const router = require('express').Router()
const orderRouter = require('./orderRouter')
const userRouter = require('./userRouter')

router.use('/',userRouter)
router.use('/order',orderRouter)

module.exports = router