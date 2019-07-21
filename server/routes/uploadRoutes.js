const router = require('express').Router()
const uploadController = require('../controllers/uploadController')
const image = require('../helpers/image.js')

router.post('/', image.multer.single('file'), image.sendUploadToGCS, uploadController.uploadFoto)

module.exports = router