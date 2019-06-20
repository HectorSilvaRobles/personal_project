import React, { Component } from 'react'
import Header from '../header/Header'
import ProductCard from '../ProductCard/ProductCard'
import {setBrand} from '../../dux/brandReducer'
import {connect} from 'react-redux'

class Adidas extends Component {
    
    componentDidMount(){
        const brand = 'Adidas'
        this.props.setBrand(brand)
    }

    render() {
        const brand = 'adidas';
        return (
            <div>
                <Header />
                <main>
                    <ProductCard brand={brand} />
                </main>
                
            </div>
        )
    }
}

const mapReduxState = reduxState => {
    return reduxState
}

const myConnect = connect(mapReduxState, {setBrand})

export default myConnect(Adidas)
