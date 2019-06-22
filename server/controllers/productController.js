module.exports = {
    addProducts: (req, res, next) => {
        const dbInstance = req.app.get('db')
        req.body.map((val, index, arr) => {
            let {name, price, size, image, description} = val
            dbInstance.productDB.post.addProduct([name, price, size, image, description])
        // .then(()=> res.status(200).send(`Just added ${name} into database`))
            .catch(err => {
            console.log(err)})
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
    },

    updateShoeSize: (req, res, next) => {
        const dbInstance = req.app.get('db')

        const {id} = req.params
        const {size} = req.query

        dbInstance.productDB.put.updateShoeSize([size, id])
        .then(()=> res.status(200).send(`this is my shoe size ${size}`))
        .catch(err => res.status(500))
    },

    adidas: (req, res, next) => {
        const dbInstance = req.app.get('db')

        console.log('getting all adidas')

        dbInstance.productDB.get.adidasProducts()
        .then((result) => res.status(200).send(result))
        .catch(err => res.status(500))
    },

    nike: (req, res, next) => {
        const dbInstance = req.app.get('db')

        console.log('these are the Nike products')

        dbInstance.productDB.get.nikeProducts()
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500))
    },

    recommendation: (req, res, next) => {
        const dbInstance = req.app.get('db')

        let {shoe} = req.params
        shoe = `%${shoe}%`
        console.log(shoe)

        dbInstance.productDB.get.allProducts(shoe)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500))
    },

    allProducts: (req, res, next) => {
        const dbInstance = req.app.get('db')

        dbInstance.productDB.get.products()
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500))
    }
}