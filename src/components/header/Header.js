import React, { Component } from 'react'
import Logout from '../signIn/Logout/Logout'
import {NavLink, Redirect} from 'react-router-dom'
import './header.css'
import ToggleButton from './SideDrawer/ToggleButton'


class Header extends Component {
    constructor(props){
        super(props)

        this.state = {
            redirect: false
        }
    }

    toHomePage = () => {
        this.setState({
            redirect: true
        })
    }

    render() {
        console.log(this.props)
        return (
            <div id='header' >
                    {this.state.redirect ? <Redirect to='/' /> : null }
                    <span onClick={() => this.toHomePage()}><img src='https://i.pinimg.com/originals/5d/10/d9/5d10d98db2f88b601b55c0809e598f26.png' /></span>
                    <div>
                        <NavLink exact to='/'>Home</NavLink>
                        <NavLink exact to ='/nike' >Nike</NavLink>
                        <NavLink to='/my-cart'>Cart</NavLink>
                        <Logout />
                    </div>
                <span className='togglebutton'>
                    <ToggleButton click={this.props.drawerclick} />
                </span>
            </div>
        )
    }
}

export default Header
