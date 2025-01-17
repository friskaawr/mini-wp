const bcrypt = require('bcrypt')

module.exports = {
    hashPassword(password){
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)
        return hash
    },
    comparePassword(password, hash){
        return bcrypt.compareSync(password, hash)
    }
}