const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Product = require('./models/product');
const AppError = require('./AppError');

const handleValidationErr = err => {
    console.dir(err);
    return new AppError(`La regaste Carnal!!!...${err.message}`, 400)
}

mongoose.connect('mongodb://localhost:27017/tacos', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> {
        console.log('systems clear')
    })
    .catch(err => {
        console.log('systems not clear lol')
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

const categories = ['harina', 'maiz']

app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', { products })
})

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})

app.post('/products', async (req, res, next) => {
    try {
    const newTaco = new Product(req.body);
    await newTaco.save();
    res.redirect(`/products/${newTaco._id}`)
    } catch(e) {
        next(e);
    }
    
});

function wrapAsync(fn){
    return function(req, res, next){
        fn(req, res, next).catch(e => next(e))
    }
}

app.get('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if(!product){
       throw next(new AppError('Taco no existe', 404));
    }
    res.render('products/show', { product })
}));

app.get('/products/:id/edit', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if(!product){
        return next(new AppError('Taco no existe', 404));
     }
    res.render('products/edit', { product, categories })
}))

app.put('/products/:id', wrapAsync(async (req, res, next) => {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
        res.redirect(`/products/${product._id}`);
}));
    

app.delete('/products/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products')
}));

app.use((err, req, res, next) => {
   if(err.name === 'ValidationError') {
       err =handleValidationErr(err)
   }
   next(err);
})

app.use((err, req, res, next) => {
   const { status = 500, message = 'you got an error! omg!' } = err;
   res.status(status).send(message);
});

app.listen(3000, () => {
    console.log('they are always listening, on port 3000 btw')
});