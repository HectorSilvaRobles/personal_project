import React, { Component } from 'react'
import Header from '../header/Header'
import ProductCard from '../ProductCard/ProductCard'
import {connect} from 'react-redux'
import {setUser} from '../../dux/reducer'
import axios from 'axios'

class Home extends Component {

    render() {
        
        return (
            <div>
                <Header />
                <main>
                    <ProductCard />
                </main>
            </div>
        )
    }
}

export default Home
