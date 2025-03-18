var mongoose = require('mongoose')

var prodSchema = new mongoose.Schema({
    prodname: {
        type: String,
        required: true,
        uniqui: true
    },
    cat_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'catagories',
        required: true,
    },
    image: String,
    qty: Number,
    price: Number
})
module.exports = mongoose.model('product', prodSchema)