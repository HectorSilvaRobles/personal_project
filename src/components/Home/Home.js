import React, { Component } from 'react'
import Header from '../header/Header'
import ProductCard from '../ProductCard/ProductCard'

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
