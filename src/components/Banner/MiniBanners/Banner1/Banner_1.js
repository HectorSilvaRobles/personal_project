import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import './banner1.css'

class Banner_1 extends Component {
    constructor(props){
        super(props)

        this.state={
            redirect: false
        }
    }

    bannerOneOnClick = () => {
        this.setState({
            redirect: true
        })
    }

    render() {
        return (
            <div id='mini-banner1'>
                {this.state.redirect ? <Redirect to='/product/104' /> : null}
                <div id='content' onClick={()=> this.bannerOneOnClick()}>
                    <h1>Have A Nike Day</h1>
                    <h2>Nike Air Max 97 ND</h2>
                    <button>Buy Now</button>
                </div>
            </div>
        )
    }
}

export default Banner_1
