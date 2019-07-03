require('dotenv').config()
const express = require('express')
const massive = require('massive');
const session = require('express-session')


const app = express()
app.use(express.static( `${__dirname}/../build`));

const {CONNECTION_STRING, SESSION_SECRET, SECRET_KEY} = process.env;
const stripe = require('stripe')(SECRET_KEY)

app.use(express.json())
// app.use(cors())

app.use(session({
    saveUninitialized: false,
    secret: SESSION_SECRET,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
})
)



massive(CONNECTION_STRING)
.then(dbInstance => {
    app.set('db', dbInstance)
    console.log('connected to database')
})

const {login, register, userInfo, logout} = require('./controllers/userController')

/// user endpoints
app.post('/api/login', login);
app.post('/api/register', register);
app.get('/api/user', userInfo);
app.get('/api/logout', logout);

const {addProducts, 
    getSpecificProduct, 
    updateQuantity, 
    updateShoeSize, 
    adidas, 
    nike,
    recommendation,
    allProducts
} = require('./controllers/productController')

//product endpoints
app.post('/api/add-products', addProducts);
app.get('/api/all-products', allProducts)
app.get('/api/product/:id', getSpecificProduct);
app.put('/api/quantity/:id', updateQuantity);
app.put('/api/mysize/:id', updateShoeSize);

app.get('/api/adidas', adidas)
app.get('/api/nike', nike)
app.get('/api/recommend/:shoe', recommendation)

// cart endpoints
const {addToCart, getUserCart, removeFromCart, resetCart} = require('./controllers/cartController')

app.post('/api/add-to-cart', addToCart)
app.get('/api/mycart/:user', getUserCart )
app.delete('/api/remove/:user&:product', removeFromCart)
app.delete('/api/reset-cart/:user', resetCart)

// stripe API endpoints
app.post('/api/new-purchase', async (req, res) => {
    console.log('Request:', req.body)

    let error;
    let status;

    try {
        const {token, total} = req.body;
        
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const charge = await stripe.charges.create({
                amount: total * 100,
                currency: 'USD',
                customer: customer.id,
                receipt_email: token.email,
                shipping: {
                    name: token.card.name,
                    address: {
                        line1: token.card.address_line1,
                        line2: token.card.address_line2,
                        city: token.card.address_city,
                        country: token.card.address_country,
                        postal_code: token.card.address_zip
                    }
                }
            }
        );
        console.log("Charge:", {charge});
        console.log({customer})
        status = 'success'
        console.log(status)
        } catch { console.log('sorry') }

        res.json({status})
    })
    

const port = 4000;

const path = require('path')
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

app.listen(port, () => console.log(`listening on port ${port}`))

// My professional career began as a Mentor and Web Developer of DevMountain. My time there was spent with a small, complex team with an ever changing coding curriculum.

// Most recently, I was promoted to Lead Mentor and Web Developer of DevMountain Phoenix in March 2019. One of my primary responsibilities involves guiding students through the second half of the curriculum with their personal and group projects.

// Prior to my current role, I served as a Customer Service Associate of Lowe's where I was responsible for the Tools, Hardware, Electrical, and Lumber departments. While there, I focused on working with my team to ensure a smooth and satisfying customer experience.

// Personal Website: https://www.seanparmar.com
// Github: https://github.com/Parmesanio 