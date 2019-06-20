import React, { Component } from 'react'
import {connect} from 'react-redux'
import {setUser} from '../../../dux/reducer'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import './login.css'

class Login extends Component {
    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: '',
            redirect: false
        }
    }

    componentDidMount(){
        axios.get('/api/user').then(res => {
            console.log(res.data)
             this.props.setUser(res.data)
        })
        console.log(this.props)
    }

    universalChangeHandler = (prop, value) => {
        this.setState({
            [prop]: value
        })
    }

    login = () => {
        const {username, password} = this.state
        if(username !== '' && password !==''){
            axios.post('/api/login', {username, password})
            .then(res => {
                if(res.data !== 'they dont match' && res.data !== 'Incorrect username/password'){
                    this.setState({
                        redirect: true
                    })
                    this.props.setUser(res.data)
                } else {
                    alert('Wrong username or password');
                }
            })
        }
    }
    

    goToHomePage = () => {
        if(this.state.redirect){
            return <Redirect to='/' />
        }
    }


    render() {
        const {username, password} = this.state
        return (
            <div className='login'>
                {this.goToHomePage()}
                <div id='user-input'>
                    Username <input onChange= {(e) => this.universalChangeHandler(e.target.name, e.target.value)} value={username} name='username' placeholder='username' />
                    Password <input onChange={(e) => this.universalChangeHandler(e.target.name, e.target.value)} value={password} name='password' type='password' placeholder='password' />
                    <div className='login-button'>
                        <button onClick={this.login}>Login</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}


const myConnect = connect(mapStateToProps, {setUser})

export default myConnect(Login)
