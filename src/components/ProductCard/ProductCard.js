import React, { Component } from 'react'
import axios from 'axios'
import './productCard.css'
import {Redirect} from 'react-router-dom'


class ProductCard extends Component {
    constructor(props){
        super(props)

        this.state = {
            products: [],
            specificProduct: null,
            redirect: false
        }
    }

    componentDidMount(){
        axios.get('/api/all-products')
        .then(res => this.setState({
            products: res.data
        }))
    }

    buttonClick (id){
        this.setState({
            specificProduct: id,
            redirect: true
        })
        
    }

    render() {
        const products = this.state.products
        const mapProducts = products.map((val, index, arr) => {
            return (
                    <div className='product-card' key={val.product_id} >
                        <img src={val.image} onClick={()=>this.buttonClick(val.product_id)} />
                        <h1>{val.name}</h1>
                        <button onClick={()=> this.buttonClick(val.product_id)}>Buy</button>
                    </div>
            )
        })
        return (
            <div id='products'>
                
                {this.state.redirect ? <Redirect to={`/product/${this.state.specificProduct}`} /> : null}
                {mapProducts}
            </div>
        )
    }
}

export default ProductCard
