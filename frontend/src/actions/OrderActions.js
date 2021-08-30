import axios from '../axios'
import { cartConstants } from '../constants/cartConstants'
import { orderConstants } from '../constants/orderConstants'


export const createOrder = (order) => async (dispatch,getState) => {

    dispatch({'type': orderConstants.ORDER_CREATE_REQUEST})
    
    const {userInfo} = getState().userLogin


    try {

        const {data} = await axios.post(
            '/api/orders/',
            order,
            {
                headers:{
                    'Content-type':'application/json',
                    'Authorization': `Bearer ${userInfo.token} `

                }
            }
        )

        dispatch({
            'type': orderConstants.ORDER_CREATE_SUCCESS,
            'payload': data
        })

        dispatch({
            'type': cartConstants.CART_EMPTY_ITEMS,
        })

        localStorage.removeItem('cartItems')

    }

    catch(error){
        dispatch({
            type: orderConstants.ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail?
                     error.response.data.detail 
                     : error.message
        })
    }
}


export const getOrder = (id) => async (dispatch,getState) => {

    dispatch({'type': orderConstants.ORDER_DETAIL_REQUEST})
    
    const {userInfo} = getState().userLogin


    try {

        const {data} = await axios.get(
            `/api/orders/${id}/`,
            {
                headers:{
                    'Authorization': `Bearer ${userInfo.token} `
                }
            }
        )

        dispatch({
            'type': orderConstants.ORDER_DETAIL_SUCCESS,
            'payload': data
        })

        // dispatch({
        //     'type': orderConstants.ORDER_DETAIL_RESET,
        // })

    }

    catch(error){
        dispatch({
            type: orderConstants.ORDER_DETAIL_FAIL,
            payload: error.response && error.response.data.detail?
                     error.response.data.detail 
                     : error.message
        })
    }
}