import React, { Component } from 'react'
import Register from './Register/Register'
import Login from './Login/Login'

class SignIn extends Component {
    render() {
        return (
            <div>
                <Register />
                <Login />
            </div>
        )
    }
}

export default SignIn
