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


    componentDidMount= ()=>{
        const user = this.props.reducer.user.user_id
        axios.get(`/api/mycart/${user}`)
        .then(res => {
            console.log(res.data)
            this.props.myCart(res.data)
        })
        .catch(err => alert('Your Cart Is Empty'))

        console.log(this.props)
    }

    removeFromCart = (product) => {
        const {user_id, product_id} = product
        
        axios.delete(`/api/remove/${user_id}&${product_id}`)
        .then(res => {
            console.log(res.data)
            this.props.myCart(res.data)
        })
        .catch(err => alert('was not able to remove from cart'))
    }

    goToProduct = (id) => {
        this.setState({
            redirect: true,
            productId: id
        })
    }

    total = () => {
        console.log(this.props)
    }

    render() {
        const myCart = this.props.reducer.myCart
        let myCosts = []
        let total = 0;
        

        let map = myCart.map(val => {
            myCosts.push(parseInt(val.price))
            const reducer = (acc, cur) => acc + cur
            console.log(myCosts)
            
            total = myCosts.reduce(reducer).toFixed(2)
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

        console.log(total)
        
        
        return (
            <div>
            {this.state.redirect ? <Redirect to={`/product/${this.state.productId}`} /> : null}
            {this.props.reducer.myCart.length > 0 ? <div id='cart'>
            <h2>CART</h2>
            <div id='mine'>
                {map}
            </div>
            <div id='summary'>
                <h1>Summary</h1>
                <div className='totals'><h3>Subtotal</h3> <h3>${total}</h3></div>
                <div className='totals'><h3>Shipping & Handling</h3> <h3>$0.00</h3></div>
                <div className='totals'><h3>Estimated Tax</h3><h3>$2.33</h3></div>
                <div className='total'><h1>Total</h1> <h1> ${(parseFloat(total) + 2.33).toFixed(2)}</h1></div>
                <Checkout total={total} />
            </div>
        </div> : <h1>empty cart</h1>}
        </div>
            
        )
    }
}

const mapRedux = (reduxState) => {
    return reduxState
}

const myConnect = connect(mapRedux, {myCart, myTotal})

export default myConnect(MyStuff)
