import React, { Component } from 'react'
import Header from '../header/Header'
import axios from 'axios'
import {connect} from 'react-redux'
import {product} from '../../dux/reducer'

class ProductPage extends Component {
    constructor(props){
        super(props)

        this.state = {
            product: null
        }
    }

    componentDidMount(){
        axios.get('/api/all-products').then(res => {
            this.props.product(res.data)
            this.props.products.map(val => {
                if(val.product_id == this.props.match.params.id){
                    this.setState({
                        product: val
                    })
                }
            })
        })
    }

    render() {
        console.log(this.props.match.params)
        console.log(this.state)
        return (
            <div>
                <Header />
                <h3>ID: {this.props.match.params.id} </h3>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

const myConnect = connect(mapStateToProps, {product})

export default myConnect(ProductPage)
