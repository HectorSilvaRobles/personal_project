import React, { Component } from 'react'
import './miniBanner.css'
import Banner_1 from './Banner1/Banner_1'
import Banner_2 from './Banner2/Banner_2'

export class MiniBanner extends Component {
    render() {
        return (
            <div id='mini-banners'>
                <Banner_1 />
                <Banner_2 />
            </div>
        )
    }
}

export default MiniBanner
