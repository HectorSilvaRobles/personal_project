import React, { Component } from 'react'
import {connect} from 'react-redux'
import {myCart} from '../../../dux/reducer'
import axios from 'axios'
import './mystuff.css'

class MyStuff extends Component {
    constructor(props){
        super(props)

        this.state = {
            myCart: []
        }
    }

    componentDidMount(){
        const user = this.props.user.user_id
        axios.get(`/api/mycart/${user}`)
        .then(res => {
            console.log(res.data)
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
        console.log(this.props)

        const mapMyCart = this.state.myCart.map(val => {
            console.log(val)
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
            </div>
        )
    }
}

const mapRedux = (reduxState) => {
    console.log(reduxState)
    return reduxState
}

const myConnect = connect(mapRedux, {myCart})

export default myConnect(MyStuff)
