const initialState = {
    user: null,
    products: []
}

const SET_USER = "SET_USER";

export default function reducer(state = initialState, action){
    console.log(action.payload)
    switch(action.type){
        case SET_USER:
            return {...state, user: action.payload};
        default:
            return state;
    }
}

export function setUser(user){
    console.log(user)
    return {
        type: SET_USER,
        payload: user
    }
}