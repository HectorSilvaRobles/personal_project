import React, { Component } from 'react'
import {connect} from 'react-redux'
import {myCart, myTotal} from '../../../dux/reducer'
import axios from 'axios'
import './mystuff.css'

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
        .catch(err => alert('there was an error'))
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
                <div className='my-stuff'>
                    <h1>{val.name}</h1>
                    <img src={val.image} />
                    <h3>{val.my_size}</h3>
                    <h3>{val.price}</h3>
                    <button onClick={()=>this.removeFromCart(val)}>Remove</button>
                </div>
            )
        })
        return (
            <div>
                {mapMyCart}
                <h1>this is the total cost {total}</h1>
            </div>
        )
    }
}

const mapRedux = (reduxState) => {
    return reduxState
}

const myConnect = connect(mapRedux, {myCart, myTotal})

export default myConnect(MyStuff)
