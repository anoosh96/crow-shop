import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import  {composeWithDevTools} from 'redux-devtools-extension'
import productListReducer from './reducers/productReducer'
import cartReducer from './reducers/cartReducer'
import {userLoginReducer,userRegisterReducer,userDetailReducer,userUpdateReducer} from './reducers/userReducer'

const reducers = combineReducers(
    {
        productList:productListReducer,
        cart:cartReducer,
        userLogin:userLoginReducer,
        userRegister:userRegisterReducer,
        userDetails: userDetailReducer,
        userUpdate: userUpdateReducer
    }
)

const cartItemsFromStorage = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')) : []

const userFromStorage = localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')? JSON.parse(localStorage.getItem('shippingAddress')) : {}



const initialState = {
    cart:{
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },

    userLogin:{
        userInfo:userFromStorage
    }
}
const middleware = [thunk]
const store = createStore(reducers,initialState,composeWithDevTools(applyMiddleware(...middleware)))


export default store