import React, { Component } from 'react'
import Register from './Register/Register'
import Login from './login/Login.js'
import './signin.css'

class SignIn extends Component {
    render() {
        return (
            <div className='page'>
            <img src='https://i.pinimg.com/originals/5d/10/d9/5d10d98db2f88b601b55c0809e598f26.png' alt='logo' />
                <div id='sign-in'>
                    <div id='login'><Login /></div>
                    <div id='register'><Register /></div>
                </div>
            </div>
        )
    }
}

export default SignIn
