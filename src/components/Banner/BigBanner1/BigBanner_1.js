import React, { Component } from 'react'
import './bb1.css'
import {Redirect} from 'react-router-dom'

class BigBanner_1 extends Component {
    constructor(props){
        super(props)

        this.state ={
            redirect: false
        }
    }
    

    yeezyOnClick = () => {
        this.setState({
            redirect: true
        })
    }

    render() {
        return (
            <div id='banner1' onClick={()=> this.yeezyOnClick()}>
                {this.state.redirect ? <Redirect to='/product/210' /> : null}
                <div className='title' >
                    <h1 >Yeezy Boost 350 V2 Zebra</h1>
                    <button onClick={()=> this.yeezyOnClick()}>Buy Now</button>
               </div>
            </div>
        )
    }
}

export default BigBanner_1
