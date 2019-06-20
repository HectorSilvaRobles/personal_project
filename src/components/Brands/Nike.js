import React, {Component} from 'react'
import Header from '../header/Header'
import ProductCard from '../ProductCard/ProductCard'
import {setBrand} from '../../dux/brandReducer'
import {connect} from 'react-redux'

class Nike extends Component {
    
    componentDidMount(){
        const brand = 'Nike'
        this.props.setBrand(brand)
        console.log(this.props.brand)
    }
    render(){
        
        console.log(this.props)
        const brand = 'nike'

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

const mapReduxState = (reduxState) => {
    return reduxState
}

const myConnect = connect(mapReduxState, {setBrand})

export default myConnect(Nike)
