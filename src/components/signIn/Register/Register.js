import React, { Component } from 'react'
import {connect} from 'react-redux'
import {setUser} from '../../../dux/reducer'
import axios from 'axios'
import {Redirect} from 'react-router-dom'


class Register extends Component {
    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: '',
            email: '',
            redirect: false
        }
    }

    componentDidMount(){
        axios.get('/api/user').then(res => {
            console.log(res.data)
        })
    }

    universalChangeHandler = (prop, value) => {
        this.setState({
            [prop]: value
        })
    }

    register = () => {
        const {username, email, password} = this.state
        if(username !== '' && email !=='' && password !==''){
            this.setState({
                redirect: true
            })

            axios.post('/api/register', {username, password, email})
            .then(res => {
                console.log(res.data)
            })
        }
    }

    goToHomePage = () => {
        if(this.state.redirect){
            return <Redirect to='/' />
        }
    }

    render() {
        console.log(this.state)
        console.log(this.props)
        const {username, password, email}= this.state;
        return (
            <div>
                {this.goToHomePage()}
                <div>
                    Username: <input onChange= {(e) => this.universalChangeHandler(e.target.name, e.target.value)} value={username} name='username' />
                    Password: <input onChange = {(e) => this.universalChangeHandler(e.target.name, e.target.value)} value={password} name='password' type='password' />
                    Email: <input onChange = {(e) => this.universalChangeHandler(e.target.name, e.target.value)} value={email} name='email' />
                </div>
                <div>
                    <button onClick={this.register}>
                        Register
                    </button>
                </div>
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

export default myConnect(Register)
