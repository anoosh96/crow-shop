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
        console.log(error.response);
        dispatch({
            type: productConstants.PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message?
                     error.response.data.message 
                     : error.message
        })
    }
 }
