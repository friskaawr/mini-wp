const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/register', userController.register)
router.post('/login', userController.loginUser)
router.post('/loginGoogle', userController.loginGoogle)
router.get('/:id', userController.findOne)

module.exports = router