import React, { Component } from 'react'
import {connect} from 'react-redux'

class MyCart extends Component {

    componentDidMount(){
        console.log(this.props)
    }
    render() {
        return (
            <div>
                my cart
            </div>
        )
    }
}



export default MyCart
