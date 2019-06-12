import React, { Component } from 'react'
import {connect} from 'react-redux'
import {setUser} from '../../../dux/reducer'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class Logout extends Component {
    constructor(props){
        super(props)

        this.state = {
            redirect: false
        }
    }

    logout = () => {
        axios.get('/api/logout')
        .then(res => {
            console.log(this.props)
        })
        this.setState({
            redirect: true
        })
    }

    goToSignInPage = () => {
        if(this.state.redirect){
            return <Redirect to='/signin' />
        }
    }

    render() {
        return (
            <div>
                {this.goToSignInPage()}
                <button onClick={this.logout} >Logout</button>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

const mapDispatchToProps = {
    setUser
}

const myConnect = connect(mapStateToProps, mapDispatchToProps)

export default myConnect(Logout)
