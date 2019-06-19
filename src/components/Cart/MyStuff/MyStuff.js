import React, { Component } from 'react'
import {connect} from 'react-redux'
import {myCart, myTotal} from '../../../dux/reducer'
import axios from 'axios'
import './mystuff.css'
import Checkout from '../Checkout/Checkout'
import {Redirect} from 'react-router-dom'

class MyStuff extends Component {
    constructor(props){
        super(props)

        this.state = {
            myCart: [],
            redirect: false,
            productId: null
        }
    }


    componentDidMount(){
        const user = this.props.user.user_id
        axios.get(`/api/mycart/${user}`)
        .then(res => {
            this.props.myCart(res.data)
            this.setState({
                myCart: res.data
            })
        })
        .catch(err => alert('Your Cart Is Empty'))
    }

    removeFromCart = (product) => {
        const {user_id, product_id} = product
        
        axios.delete(`/api/remove/${user_id}&${product_id}`)
        .then(res => {
            this.setState({
                myCart: res.data
            })
        })
        .catch(err => alert('was not able to remove from cart'))
    }

    goToProduct = (id) => {
        this.setState({
            redirect: true,
            productId: id
        })
    }

    render() {
        let myCosts = []
        
        let total = 0;
        console.log(total)
        console.log(this.props)
        console.log(this.state.myCart)
        
        const mapMyCart = this.state.myCart.map(val => {
            myCosts.push(parseFloat(val.price))
    
            const reducer = (acc, cur) => acc + cur
            let myTotal = myCosts.reduce(reducer).toFixed(2)
            total = myTotal

            this.props.myTotal(total)
            console.log(val)
            return (
                <div id='my-stuff'>
                    <span><img src={val.image} onClick={()=> this.goToProduct(val.product_id)}/></span>
                    <div className='info'>
                        <h1 onClick={()=> this.goToProduct(val.product_id)}>{val.name}</h1>
                        <h3>Size {val.my_size}</h3>
                        <h3>${val.price}</h3>
                    </div>
                    <button onClick={()=>this.removeFromCart(val)}>X</button>
                </div>
            )
        })
        return (
            <div>
            {this.state.redirect ? <Redirect to={`/product/${this.state.productId}`} /> : null}
            {this.state.myCart.length > 0 ? <div id='cart'>
            <h2>CART</h2>
            <div id='mine'>
                {mapMyCart}
            </div>
            <div id='summary'>
                <h1>Summary</h1>
                <div className='totals'><h3>Subtotal</h3> <h3>${total}</h3></div>
                <div className='totals'><h3>Shipping & Handling</h3> <h3>$0.00</h3></div>
                <div className='totals'><h3>Estimated Tax</h3><h3>$2.33</h3></div>
                <div className='total'><h1>Total</h1> <h1> ${(parseFloat(total) + 2.33).toFixed(2)}</h1></div>
                <Checkout />
            </div>
        </div> : <h1>Nothing in cart</h1>}
        </div>
            
        )
    }
}

const mapRedux = (reduxState) => {
    return reduxState
}

const myConnect = connect(mapRedux, {myCart, myTotal})

export default myConnect(MyStuff)
