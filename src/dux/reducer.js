import axios from 'axios'

const initialState = {
    user: null,
    products: [],
    productId: null
}

const SET_USER = "SET_USER";
const PRODUCTS = "PRODUCTS"


export default function reducer(state = initialState, action){
    switch(action.type){
        case SET_USER:
            console.log('this is the action.payload', action.payload)
            return {...state, user: action.payload};
        case PRODUCTS:
            return {...state, products: action.payload}
        default:
            return 'this is initial state', state;
    }
}

export function setUser(user){
    return {
        type: SET_USER,
        payload: user
    }
}
export function product(products){
    return {
        type: PRODUCTS,
        payload: products
    }
}