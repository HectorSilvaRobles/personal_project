

const initialState = {
    user: null,
    allProducts: [],
    myProduct: []
}

const SET_USER = "SET_USER"
const PRODUCTS = "PRODUCTS"
const MY_PRODUCT = "MY_PRODUCT"


export default function reducer(state = initialState, action){
    switch(action.type){
        case SET_USER:
            console.log('this is the user who logged in', action.payload)
            return {...state, user: action.payload};
        case PRODUCTS:
            console.log('hey from reducer')
            return {...state, allProducts: action.payload}
        case MY_PRODUCT:
            console.log('take a look', action.payload)
            return {...state, myProduct: action.payload}
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

export function myProduct(myProduct){
    return {
        type: MY_PRODUCT,
        payload: myProduct
    }
}