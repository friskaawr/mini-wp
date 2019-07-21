const router = require('express').Router()
const articleController = require('../controllers/articleControllers')
const authetication = require('../middlewares/authentication')

router.get('/', articleController.allArticle)
router.post('/', authetication, articleController.createArticle)
router.get('/articleData/:id', articleController.getOneArticle)
router.delete('/deleteArticles', articleController.deleteArticle)
router.put('/updateArticle/:id' , articleController.updateArticle)

module.exports = router