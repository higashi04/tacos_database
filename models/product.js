const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'carnal, te falta poner el nombre de tu taco']
    },
    price: {
        type: Number,
        required: [true, 'ni que los fueras a regalar bato'],
        min: 0
    },
    category: {
        type: String,
        enum: ['harina', 'maiz']
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;