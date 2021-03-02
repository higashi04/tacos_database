const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/tacos', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> {
        console.log('systems clear')
    })
    .catch(err => {
        console.log('systems not clear lol')
        console.log(err)
    })

    // const p = new Product({
    //     name: 'Quesadilla',
    //     price: 50.00,
    //     category: 'harina'
    // })
    // p.save().then(p=> {
    //     console.log(p)
    // })
    // .catch(e => {
    //     console.log(e)
    // })
    const seedProducts = [
        {
                name: 'Burrito de Fajita',
                price: 95.00,
                category: 'harina'
            },
            {
                name: 'Burrito de Alambre',
                price: 80.00,
                category: 'harina'
            },
            {
                name: 'Tacos de Pastor',
                price: 15.00,
                category: 'maiz'
            },
            {
                name: 'Gringa',
                price: 20.00,
                category: 'harina'
            },
            {
                name: 'Quesadilla de Carne',
                price: 95.00,
                category: 'maiz'
            },
    ]

    Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(e => {console.log(e)})