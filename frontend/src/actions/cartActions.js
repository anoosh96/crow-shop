import {cartConstants} from '../constants/cartConstants'
import axios from 'axios'

export const addToCart = (id,qty) => async (dispatch,getState) => {

    try {
        const {data} = await axios.get(`/api/products/${id}`);
        console.log('QTY: ' + qty)
        dispatch({
            type: cartConstants.CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        })
        
        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
    } 
    catch (error) {
        console.log(error.response);
    }
 }

 export const removeCart = (id) => async (dispatch,getState) => {
       
    dispatch({
        type: cartConstants.CART_REMOVE_ITEM,
        payload: id
    })
    
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
    
 }
