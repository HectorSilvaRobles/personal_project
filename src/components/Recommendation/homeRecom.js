import React, { Component } from 'react'
import axios from 'axios'
import './adidasRecom.css'
import {Redirect} from 'react-router-dom'

class AdidasRecom extends Component {
    constructor(props){
        super(props)

        this.state = {
            recommend: [],
            redirect: false,
            id: null
        }
    }

    componentDidMount(){
        const shoeType = 'Yeezy Boost 350'
        axios.get(`/api/recommend/${shoeType}`)
        .then(res => this.setState({recommend: res.data}))
    }

    clickProduct = (id) => {
        this.setState({
            id: id,
            redirect: true
        })
    }
    render() {
        console.log(this.state)
        const {recommend} = this.state

        const mapRecommend = recommend.map(val => {
            return(
                <div id='product-recommend' onClick={()=> this.clickProduct(val.product_id)}>
                    <h1>{val.name}</h1>
                    <img src={val.image} />
                    <button>Buy Now</button>
                </div>
            )
        })
        return (
            <div id='recommend'>
                {this.state.redirect ? <Redirect to={`/product/${this.state.id}`} /> : null}
               {mapRecommend}
            </div>
        )
    }
}


export default AdidasRecom
