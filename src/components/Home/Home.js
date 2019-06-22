import React, { Component } from 'react'
import Header from '../header/Header'
import SideDrawer from '../header/SideDrawer/SideDrawer'
import Backdrop from '../Backdrop/Backdrop'
import BigBanner from '../Banner/BigBanner1/BigBanner_1'
import AdidasRecom from '../Recommendation/homeRecom'
import MiniBanner from '../Banner/MiniBanners/MiniBanner'
import './home.css'

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
            <div >
                <Header drawerclick={this.drawerToggleClick} />
                <SideDrawer show={this.state.drawerOpen} />
                {backdrop}
                <main className='home'>
                    <BigBanner />
                    <div className='recommendation'>
                        <AdidasRecom />
                    </div>
                    <MiniBanner />
                </main>
            </div>
        )
    }
}

export default Home
