import React, { Component } from 'react'
import Header from '.././header/Header'
import {connect} from 'react-redux'
import {myCart} from '../../dux/reducer'
import SideDrawer from '../header/SideDrawer/SideDrawer'
import Backdrop from '../Backdrop/Backdrop'
import axios from 'axios'
import './thankyou.css'


class ThankYou extends Component {
    constructor(props){
        super(props)

        this.state = {
            drawerOpen: false
        }
    }

    drawerToggleClick = () => {
        this.setState((prevState) => {
            return {drawerOpen: !prevState.drawerOpen};
        })
    }

    backdropClick =() => {
        this.setState({drawerOpen: false})
    }


    componentDidMount(){
        console.log(this.props)
        const user = this.props.reducer.user.user_id
        console.log(user)
        axios.delete(`/api/reset-cart/${user}`)
        .then(res => console.log(res.data))
        .catch(err => {
            console.log(err)
        })
    }
    render() {
        let backdrop;
        if(this.state.drawerOpen){
            backdrop = <Backdrop click={this.backdropClick} />
        }
        return (
            <div>
                <Header drawerclick={this.drawerToggleClick} />
                <SideDrawer show={this.state.drawerOpen} />
                {backdrop}
                <body class='thankyou' >
                    <h1>Thank You For Your Purchase :)</h1>
                    <div class='box'>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </body>
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
