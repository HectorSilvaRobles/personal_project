const initialState = {
    brand: null
}

const SET_BRAND = "SET_BRAND"

export default function brand(state = initialState, action){
    console.log(action)
    switch(action.type){
        case SET_BRAND:
            return {...state, brand: action.payload}
        default:
            return state
    }
}

export function setBrand(brand){
    console.log(brand)
    return {
        type: SET_BRAND,
        payload: brand
    }
}