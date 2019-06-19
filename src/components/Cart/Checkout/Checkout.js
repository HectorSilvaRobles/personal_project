import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux'
import {myTotal} from '../../../dux/reducer'
import Axios from 'axios';
import {toast} from 'react-toastify'
import {Redirect} from 'react-router-dom'


toast.configure()


class Checkout extends Component {
    constructor(props){
        super(props)

        this.state = {
            total: 0,
            redirect: false
        }
        this.handleToken = this.handleToken.bind(this)
    }

    async handleToken(token, addresses){
        console.log(token , total)
        total = parseFloat(total)
        
        const response = await Axios.post('/api/new-purchase', {token, total})
        const { status } = response.data
        
        if(status == 'success'){
            this.setState({
                redirect: true
            })
        }
    }

   
  
    render() {
        console.log(this.props)
        console.log(total)
        total = (parseFloat(total) + 2.33).toFixed(2)

        return (
            <div>
            {this.state.redirect ? <Redirect to='/thank-you' /> : null}
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
