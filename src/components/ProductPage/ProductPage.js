import React, { Component } from 'react'
import Header from '../header/Header'
import axios from 'axios'
import {connect} from 'react-redux'
import {product, myProduct} from '../../dux/reducer'
import './productPage.css'
import {Redirect} from 'react-router-dom'


class ProductPage extends Component {
    constructor(props){
        super(props)

        this.state = {
            product: null,
            size: null,
            redirect: false,
            myProduct: null
        }
    }

    componentDidMount(){
        axios.get('/api/all-products').then(res => {
            this.props.product(res.data)
            this.props.allProducts.map((val, index, arr) => {
                if(val.product_id == this.props.match.params.id){
                    this.setState({
                        product: [val]
                    })
                }
            })
        })
    }

    tableCreator=(sizes)=>{
        var main = document.getElementById('sizes')
        if(sizes.length < 28){
            for(let i = 0; i < sizes.length; i++){
                var li = document.createElement('LI')
                var button = document.createElement('BUTTON')
                var b = document.createTextNode(sizes[i])
                li.id = i
                
                li.appendChild(button)
                button.appendChild(b);
                main.appendChild(li)
                if(main.getElementsByTagName('*').length >= sizes.length * 2){
                    main.removeChild(li)
                }
            } 
        }
    }

    addToCartButton = () => {
        const {myProduct} = this.state
        const mySize = myProduct[0].size
        const productId = myProduct[0].product_id
        
        if(mySize.length <= 4){
            this.setState({
                redirect: true,
            })
            this.props.myProduct(myProduct)
            axios.put(`/api/mysize/${productId}?size=${mySize}`)
            .then(res => console.log(res.data))
        } else {
            alert('Choose A Size')
        }
    }

    updateShoeSize =( size ) => {
        
        const {product} = this.state
    
        product.map(val => {
            val.size = size
        })
        this.setState({
            myProduct: product
        })
    }

    render() {
        const product = this.state.product
        let mapProductInfo;
        console.log(this.props)
        
        if(product !== null){
            mapProductInfo = product.map(val => {
                this.tableCreator(val.size)
                
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
                {this.state.redirect ? <Redirect to='/my-cart' /> : null}
                <Header />
                <div id='productInfo'>
                    {mapProductInfo}
                    <div className='tricky'>
                        <ul id='sizes' onClick={(e)=> this.updateShoeSize(e.target.innerText)}></ul>
                        <button id='add-to-cart' onClick={()=>this.addToCartButton()}>ADD TO CART</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

const mapReduxState = {
    product,
    myProduct
}

const myConnect = connect(mapStateToProps, mapReduxState)

export default myConnect(ProductPage)
