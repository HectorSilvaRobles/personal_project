import React, { Component } from 'react'
import Logout from '../signIn/Logout/Logout'
import {NavLink} from 'react-router-dom'


class Header extends Component {
    render() {
        return (
            <div>
                <NavLink exact to='/'>Home</NavLink>
                <NavLink >Products</NavLink>
                <NavLink to='/my-cart'>Cart</NavLink>
                <Logout />
            </div>
        )
    }
}

export default Header
