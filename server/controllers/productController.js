module.exports = {
    addProducts: (req, res, next) => {
        const dbInstance = req.app.get('db')
        req.body.map((val, index, arr) => {
            let {name, price, size, image} = val
            dbInstance.productDB.post.addProduct([name, price, size, image])
        // .then(()=> res.status(200).send(`Just added ${name} into database`))
            .catch(err => {
            console.log(err)})
        })
    },

    getAllProducts: (req, res, next) => {
        const dbInstance = req.app.get('db');

        console.log('hit')

        dbInstance.productDB.get.allProducts()
        .then((result) => res.status(200).send(result))
        .catch((err) => {
            res.status(500).send('sorry was not able to get all products')
        })
    },

    getSpecificProduct: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const {id} = req.params
        console.log('hi')

        dbInstance.productDB.get.specificProduct(id)
        .then((result) => res.status(200).send(result))
        .catch(err => {
            res.status(500).send('was not able to get the product')
        })
    },

    updateQuantity: (req, res, next) => {
        const dbInstance = req.app.get('db')

        const {id} = req.params
        const {quantity} = req.query

        dbInstance.productDB.put.updateQuantity([quantity, id])
        .then(() => res.status(200).send('just updated the quantity of products'))
        .catch(err => res.status(500))
    }
}