import React, { Component } from 'react'
import Header from '../header/Header'
import ProductCard from '../ProductCard/ProductCard'
import SideDrawer from '../header/SideDrawer/SideDrawer'
import Backdrop from '../Backdrop/Backdrop'

class Home extends Component {
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

    render() {
        let backdrop;
        if(this.state.drawerOpen){
            backdrop = <Backdrop click={this.backdropClick} />
        }
        return (
            <div className='home'>
                <Header drawerclick={this.drawerToggleClick} />
                <SideDrawer show={this.state.drawerOpen} />
                {backdrop}
                <main>
                    Hey
                </main>
            </div>
        )
    }
}

export default Home
