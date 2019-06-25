import React, { Component } from 'react'
import './banner2.css'
import {Redirect} from 'react-router-dom'

class Banner_2 extends Component {
    constructor(props){
        super(props)

        this.state={
            redirect: false
        }
    }

    bannerTwoOnClick = () => {
        this.setState({
            redirect: true
        })
    }

    render() {
        return (
            <div id='mini-banner2'>
            {this.state.redirect ? <Redirect to='/product/246' /> : null}
                <div id='content' onClick={()=> this.bannerTwoOnClick()}>
                    <h1 className='banner2H1'>Pharrell Williams</h1>
                    <h2 className='banner2H2'>Human Race NMD</h2>
                    <button className='banner2B'>Buy Now</button>
                </div>
            </div>
        )
    }
}

export default Banner_2
