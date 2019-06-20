import React, { Component } from 'react'
import Header from '../header/Header'
import axios from 'axios'
import {connect} from 'react-redux'
import {product, myProduct, setUser} from '../../dux/reducer'
import './productPage.css'
import SideDrawer from '../header/SideDrawer/SideDrawer'
import Backdrop from '../Backdrop/Backdrop'
import {toast} from 'react-toastify'

import "react-toastify/dist/ReactToastify.css"
toast.configure()


class ProductPage extends Component {
    constructor(props){
        super(props)

        this.state = {
            product: null,
            size: null,
            myProduct: null,
            drawerOpen: false
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
        axios.get('/api/user').then(res => this.props.setUser(res.data))
        
    }

    drawerToggleClick = () => {
        this.setState((prevState) => {
            return {drawerOpen: !prevState.drawerOpen};
        })
    }

    backdropClick =() => {
        this.setState({drawerOpen: false})
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
        console.log(myProduct)
        if(myProduct == null){
            alert('Choose A Size')
        } else{
        const mySize = myProduct[0].size
        const productId = myProduct[0].product_id
        
        
        if(mySize.length <= 4 && this.state.size !== null){
            this.props.myProduct(myProduct)
            axios.put(`/api/mysize/${productId}?size=${mySize}`)
            .then(res => console.log(res.data))
            toast(`Just added ${this.state.product[0].name} to cart`, {type: 'success'})
        } else {
            alert('Choose A Size')
        }

        if(this.props.user.user_id !== null){
            const user_id = this.props.user.user_id
            axios.post('/api/add-to-cart', {user_id, productId})
            .then(res => console.log(res.data))
        } else{
            console.log('there is no user logged in')
        }
    }
}

    updateShoeSize =( size ) => {
        
        const {product} = this.state
    
        product.map(val => {
            val.size = size
        })
        this.setState({
            myProduct: product,
            size: size
        })
    }

    render() {
        const product = this.state.product
        let mapProductInfo;
        console.log(this.props)
        

        let backdrop;
        if(this.state.drawerOpen){
            backdrop = <Backdrop click={this.backdropClick} />
        }


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
                <Header drawerclick={this.drawerToggleClick} />
                <SideDrawer show={this.state.drawerOpen} />
                {backdrop}
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
    myProduct,
    setUser
}

const myConnect = connect(mapStateToProps, mapReduxState)

export default myConnect(ProductPage)
