import React, { Component } from 'react'
import './banner2.css'

class Banner_2 extends Component {
    render() {
        return (
            <div id='mini-banner2'>
                <div id='content' onClick={()=> this.bannerOneOnClick()}>
                    <h1 className='banner2H1'>Pharrell Williams</h1>
                    <h2 className='banner2H2'>Human Race NMD</h2>
                    <button className='banner2B'>Buy Now</button>
                </div>
            </div>
        )
    }
}

export default Banner_2
