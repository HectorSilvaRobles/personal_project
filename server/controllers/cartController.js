module.exports = {
    getUserCart: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const {user} = req.params

        dbInstance.cartDB.userCart(user)
        .then(result => res.status(200).send(result))
        .catch(err => {
            res.status(500).send('was not able to get user cart')
        })
    },

    addToCart: (req, res, next) => {
        const dbInstance = req.app.get('db')

        const {user_id, productId} = req.body
        console.log(user_id, productId)

        dbInstance.cartDB.addToCart([user_id, productId])
        .then(() => res.status(200).send('Just added user\'s cart to database'))
        .catch((err) => {
            res.status(500).send('was not able to add cart info')
        })
    },

    removeFromCart: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const {user, product} = req.params
        console.log( user, product)

        dbInstance.cartDB.removeFromCart([user, product])
        .then((updatedCart)=> res.status(200).send(updatedCart))
        .catch(err => {
            res.status(500).send('Was not able to remove product from cart')
        })
        
    }
}