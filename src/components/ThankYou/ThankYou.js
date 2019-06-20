import React, { Component } from 'react'
import Header from '.././header/Header'
import {connect} from 'react-redux'
import {myCart} from '../../dux/reducer'
import axios from 'axios'


class ThankYou extends Component {
    componentDidMount(){
        const user = this.props.reducer.user.user_id
        axios.delete(`/api/reset-cart/${user}`)
        .then(res => console.log(res.data))
        .catch(err => {
            console.log(err)
        })
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
