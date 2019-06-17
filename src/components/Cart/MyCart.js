import React, { Component } from 'react'
import {connect} from 'react-redux'
import {myCart} from '../../dux/reducer'
import Header from '../header/Header'
import MyStuff from './MyStuff/MyStuff'

class MyCart extends Component {
    
    render() {
        return (
            <div>
                <Header />
                <div id='my-cart'>
                    <h1>Here is your cart </h1>
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
