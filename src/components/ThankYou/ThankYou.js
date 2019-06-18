import React, { Component } from 'react'
import Header from '.././header/Header'
import {connect} from 'react-redux'
import {myCart} from '../../dux/reducer'


class ThankYou extends Component {
    componentDidMount(){
        this.props.myCart(null)
    }
    render() {
        return (
            <div>
                <Header />
            </div>
        )
    }
}

const mapReduxState = (reduxState) => {
    console.log(reduxState)
    return reduxState
}

const myConnect = connect(mapReduxState, {myCart})

export default myConnect(ThankYou)
