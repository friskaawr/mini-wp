

class UploadController{
    static uploadFoto(req, res, next){
        console.log(req.body, "ini kalo ada body");
        console.log(req.file, "ini filenyaa");
    
        res.send({
            status: 200,
            message: 'Your file is successfully uploaded',
            link: req.file.cloudStoragePublicUrl
        })
    }
}

module.exports = UploadController