import React, { Component } from 'react'
import axios from 'axios'
import './productCard.css'

class ProductCard extends Component {
    constructor(props){
        super(props)

        this.state = {
            products: []
        }
    }

    componentDidMount(){
        axios.get('/api/all-products')
        .then(res => this.setState({
            products: res.data
        }))
    }

    buttonClick = (id) => {
        
    }

    render() {
        const products = this.state.products
        const mapProducts = products.map((val, index, arr) => {
            return (
                    <div className='product-card' >
                        <img src={val.image} />
                        <h1>{val.name}</h1>
                        <button>Buy</button>
                    </div>
            )
        })

        return (
            <div id='products'>
                {mapProducts}
            </div>
        )
    }
}

export default ProductCard
