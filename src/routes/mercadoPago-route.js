const express = require('express')
const router = express.Router()
const controller = require('../controllers/mercadoPago-controller')

router.get('/', controller.get)
router.post('/', controller.post)
router.post('/notifications', controller.notifications)

module.exports = router
