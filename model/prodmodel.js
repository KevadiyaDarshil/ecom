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
    description:String,
    image: String,
    qty: Number,
   offer: Number,
    price: Number
})
prodSchema.index({ title: 'text', description: 'text' });
module.exports = mongoose.model('product', prodSchema)
