import React, { Component } from 'react'
import Header from '../header/Header'
import ProductCard from '../ProductCard/ProductCard'
import {setBrand} from '../../dux/brandReducer'
import {connect} from 'react-redux'
import SideDrawer from '../header/SideDrawer/SideDrawer'
import Backdrop from '../Backdrop/Backdrop'

class Adidas extends Component {
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

    componentDidMount(){
        const brand = 'Adidas'
        this.props.setBrand(brand)
    }

    render() {
        let backdrop;
        if(this.state.drawerOpen){
            backdrop = <Backdrop click={this.backdropClick} />
        }
        const brand = 'adidas';
        return (
            <div>
                <Header drawerclick={this.drawerToggleClick} />
                <SideDrawer show={this.state.drawerOpen} />
                {backdrop}
                <main>
                    <ProductCard brand={brand} />
                </main>
                
            </div>
        )
    }
}

const mapReduxState = reduxState => {
    return reduxState
}

const myConnect = connect(mapReduxState, {setBrand})

export default myConnect(Adidas)
