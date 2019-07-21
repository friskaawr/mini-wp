const Article = require('../models/article')

class articleController{
    static createArticle(req, res, next){
        const {title, content} = req.body
        const newArticle = {title, content, UserId : req.decoded.id}
        // console.log(req.decoded.id, "ini idnyaaaaaaaaaaa");
        
        Article.create(newArticle)
        .then(created => {
            res.status(201).json(created)
        })
        .catch(next)
    }

    static allArticle(req, res, next){
        Article.find({})
        .populate('UserId')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
        
    }

    static deleteArticle(req, res, next){
        let id = req.body.id
        console.log(id);
        Article.deleteOne({_id : id})
        .then(deleted => {
            console.log("success");
            
            console.log(deleted);
            
            res.status(200).json({
                message : `Success delete!`
            })
        })
        .catch(next)
    }

    static getOneArticle(req, res, next){
        Article.findById(req.params.id)
        .then(found => {
            console.log(found, "ketemu data articlenya");
            res.status(200).json(found)
        })
        .catch(next)
    }

    static updateArticle(req, res, next){
        let updateArticle = {}
        req.body.title && (updateArticle.title = req.body.title)
        req.body.content && (updateArticle.content = req.body.content)

        Article.findByIdAndUpdate(req.params.id, updateArticle, {new : true})
        .then(updated => {
            console.log(updated);
            res.status(200).json({
                message : `Success update`,
            })
        })
        .catch(next)
    }
}

module.exports = articleController