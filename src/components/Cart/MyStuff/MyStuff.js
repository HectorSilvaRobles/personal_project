import React, { Component } from 'react'
import {connect} from 'react-redux'
import {myCart, myTotal} from '../../../dux/reducer'
import axios from 'axios'
import './mystuff.css'
import Checkout from '../Checkout/Checkout'

class MyStuff extends Component {
    constructor(props){
        super(props)

        this.state = {
            myCart: [],
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

    render() {
        let myCosts = []
        
        let total = 0;
        console.log(total)
        console.log(this.props)
        
        const mapMyCart = this.state.myCart.map(val => {
            myCosts.push(parseFloat(val.price))
    
            const reducer = (acc, cur) => acc + cur
            let myTotal = myCosts.reduce(reducer).toFixed(2)
            total = myTotal

            this.props.myTotal(total)

            return (
                <div id='my-stuff'>
                    <span><img src={val.image} /></span>
                    <div className='info'>
                        <h1>{val.name}</h1>
                        <h3>Size {val.my_size}</h3>
                        <h3>${val.price}</h3>
                    </div>
                    <button onClick={()=>this.removeFromCart(val)}>X</button>
                </div>
            )
        })
        return (
            <div id='cart'>
                <h2>CART</h2>
                <div id='mine'>
                    {mapMyCart}
                </div>
                <div id='summary'>
                    <h1>Summary</h1>
                    <h3>Subtotal ${total}</h3>
                    <h3>Shipping & Handling $0.00</h3>
                    <h3>Estimated Tax $2.33</h3>
                    <h1>Total ${(parseFloat(total) + 2.33).toFixed(2)}</h1>
                    <Checkout />
                </div>
            </div>
        )
    }
}

const mapRedux = (reduxState) => {
    return reduxState
}

const myConnect = connect(mapRedux, {myCart, myTotal})

export default myConnect(MyStuff)
