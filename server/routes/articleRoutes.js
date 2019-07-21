const router = require('express').Router()
const articleController = require('../controllers/articleControllers')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', articleController.allArticle)
router.use(authentication)
router.post('/', articleController.createArticle)
router.get('/articleData/:id', articleController.getOneArticle)
router.use(authorization)
router.delete('/deleteArticles/:id', articleController.deleteArticle)
router.put('/updateArticle/:id' , articleController.updateArticle)

module.exports = router