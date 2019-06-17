require('dotenv').config()
const express = require('express')
const massive = require('massive');
const session = require('express-session')

const app = express()

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

const {addProducts, getAllProducts, getSpecificProduct, updateQuantity, updateShoeSize} = require('./controllers/productController')

//product endpoints
app.post('/api/add-products', addProducts);
app.get('/api/all-products', getAllProducts);
app.get('/api/product/:id', getSpecificProduct);
app.put('/api/quantity/:id', updateQuantity);
app.put('/api/mysize/:id', updateShoeSize);

// cart endpoints
const {addToCart, getUserCart, removeFromCart} = require('./controllers/cartController')

app.post('/api/add-to-cart', addToCart)
app.get('/api/mycart/:user', getUserCart )
app.delete('/api/remove/:user&:product', removeFromCart)

// stripe API endpoints
app.post('/api/new-purchase', async (req, res) => {
    console.log('Request:', req.body)

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
        } catch { console.log('sorry') }
    })


const port = 4000;

app.listen(port, () => console.log(`listening on port ${port}`))

