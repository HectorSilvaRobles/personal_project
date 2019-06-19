import React, { Component } from 'react'
import {connect} from 'react-redux'
import {myCart} from '../../dux/reducer'
import Header from '../header/Header'
import MyStuff from './MyStuff/MyStuff'
import Checkout from './Checkout/Checkout'

class MyCart extends Component {
    
    render() {
        return (
            <div>
                <Header />
                <div id='my-cart'>
                    <MyStuff />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

const myConnect = connect(mapStateToProps, {myCart})


export default myConnect(MyCart)
