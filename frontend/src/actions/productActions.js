import {productConstants} from '../constants/productsConstants'
import axios from 'axios'

export const fetchProducts = () => async (dispatch) => {

    dispatch({type:productConstants.PRODUCT_LIST_REQUEST});

    try {
        const {data} = await axios.get('/api/products');
        dispatch({
            type: productConstants.PRODUCT_LIST_SUCCESS,
            payload: data
        })    
    } 
    catch (error) {
        dispatch({
            type: productConstants.PRODUCT_LIST_FAIL,
            payload: error.message
        })
    }
 }
