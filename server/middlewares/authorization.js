const Article = require('../models/article')

module.exports = (req, res, next) => {
    Article.findOne({
        UserId : req.decoded.id
    })
    .then(data => {
        if(data){
            if(data.UserId = req.decoded.id){
                next()
            } else {
                throw {
                    code : 401
                }
            }
        } else {
            throw {
                code : 404
            }
        }
    })
    .catch(next)
}