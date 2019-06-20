import {createStore, combineReducers} from 'redux'
import reducer from './reducer'
import brand from './brandReducer'

const rootReducer = combineReducers({reducer: reducer, brand: brand})

export default createStore(rootReducer)