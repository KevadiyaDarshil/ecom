var mongoos = require('mongoose')

var userSchema = new mongoos.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: String,
    password: String
})
module.exports = mongoos.model('user', userSchema);