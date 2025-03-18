var mongoose = require('mongoose')

var catshema = new mongoose.Schema({
    name: String
})
module.exports = mongoose.model('catagories', catshema)