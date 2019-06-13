import React, { Component } from 'react'
import Header from '../header/Header'
import axios from 'axios'
import {connect} from 'react-redux'
import {product} from '../../dux/reducer'
import './productPage.css'
import { booleanTypeAnnotation } from '@babel/types';

class ProductPage extends Component {
    constructor(props){
        super(props)

        this.state = {
            product: null,
            size: null
        }
    }

    componentDidMount(){
        axios.get('/api/all-products').then(res => {
            this.props.product(res.data)
            this.props.products.map((val, index, arr) => {
                if(val.product_id == this.props.match.params.id){
                    this.setState({
                        product: [val]
                    })
                }
            })
        })
    }

    tableCreator=(size, id)=>{
         var li = document.createElement('LI')
         var button = document.createElement('BUTTON')
         var b = document.createTextNode(size)
         li.id = id
         

         li.appendChild(button)
         button.appendChild(b);
         var main = document.getElementById('sizes')
         console.log(main)
         main.appendChild(li)
    }

    render() {
        const product = this.state.product
        let mapProductInfo;
        console.log(this.state)
        if(product !== null){
            mapProductInfo = product.map(val => {
                for(let i =0; i < val.size.length; i++){
                    this.tableCreator(val.size[i],i)
                }
                return (
                    <div id='pro'>
                        <div className='product-image'>
                            <img src={val.image} className='product-image' />
                        </div>
                        <div className='product-info'>
                            <h1>{val.name}</h1>
                            <h2>${val.price}</h2>
                            <p>{val.description}</p>
                            <div>
                                {this.tableCreator}
                            </div>
                            
                        </div>
                        
                    </div>
                )
            })
        }

        return (
            <div id='product'>
                <Header />
                <div id='productInfo'>
                    {mapProductInfo}
                    <div className='tricky'>
                        <ul id='sizes' onClick={(e)=> this.setState({size: e.target.innerText})}></ul>
                        <button id='add-to-cart'>ADD TO CART</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

const myConnect = connect(mapStateToProps, {product})

export default myConnect(ProductPage)
