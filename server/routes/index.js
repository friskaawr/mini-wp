const router = require('express').Router()
const articleRouter = require('./articleRoutes')
const userRouter = require('./userRoutes')
const uploadRouter = require('./uploadRoutes')


router.use('/articles', articleRouter)
router.use('/users', userRouter)
router.use('/uploads', uploadRouter)
module.exports = router