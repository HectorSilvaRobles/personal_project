import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux'
import {myTotal} from '../../../dux/reducer'
import Axios from 'axios';
import {toast} from 'react-toastify'

toast.configure()


class Checkout extends Component {
    constructor(props){
        super(props)

        this.state = {
            total: 0
        }
    }

    handleToken(token, addresses){
        console.log(token , total)
        Axios.post('/api/new-purchase', {token, total})
    }
  
    render() {
        console.log(this.props)
        console.log(total)

        return (
            <div>
                <StripeCheckout
                stripeKey="pk_test_kbq45PJwI7ALRKxEVvjQOpp600jPjZhK6m"
                token={this.handleToken}
                billingAddress
                shippingAddress
                amount= {total * 100}
                 />
            </div>
        )
    }
}

let total = 0;

const mapReduxState = (reduxState) => {
    total = reduxState.myTotal
    
    return reduxState
}

const myConnect = connect(mapReduxState, {myTotal})

export default myConnect(Checkout)
