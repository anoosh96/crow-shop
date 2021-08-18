import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import  {composeWithDevTools} from 'redux-devtools-extension'
import productListReducer from './reducers/productReducer'
import cartReducer from './reducers/cartReducer'


const reducers = combineReducers(
    {
        productList:productListReducer,
        cart:cartReducer
    }
)

const cartItemsFromStorage = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')) : []
const initialState = {
    cart:{
        cartItems: cartItemsFromStorage
    }
}
const middleware = [thunk]
const store = createStore(reducers,initialState,composeWithDevTools(applyMiddleware(...middleware)))


export default store