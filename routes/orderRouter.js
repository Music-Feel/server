const router = require('express').Router()
const orderController = require('../controllers/orderController')
const { authenticate, authorize }  = require('../middlewares/auth.js')

router.use(authenticate)
router.post('/',orderController.create)
router.get('/all',orderController.findAll)
router.get('/:id',orderController.findOne)
router.delete('/:id',authorize,orderController.destroy)
router.put('/:id',authorize, orderController.update)

module.exports = router