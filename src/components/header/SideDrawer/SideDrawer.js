import React from 'react'
import {NavLink} from 'react-router-dom'
import Logout from '../../signIn/Logout/Logout'
import './sideDrawer.css'

export default function SideDrawer(props) {
    let drawerClasses = 'drawer'
    if(props.show){
        drawerClasses = 'drawer open';
    }
    
    return (
        <div className={drawerClasses}>
            <NavLink exact to='/'>Home</NavLink>
            <NavLink >Products</NavLink>
            <NavLink to='/my-cart'>Cart</NavLink>
            <Logout />
        </div>
    )
}
