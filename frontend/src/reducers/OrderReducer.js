import { orderConstants } from "../constants/orderConstants"

export const orderCreateReducer = (state = {}, action)=>{
    switch (action.type){
        case orderConstants.ORDER_CREATE_REQUEST:
            return {
                loading: true
            }

        case orderConstants.ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case orderConstants.ORDER_CREATE_SUCCESS:
            return {
                loading: false, success: true, order: action.payload
            }

        case orderConstants.ORDER_CREATE_RESET:
            return {}

        default:
            return state
    }
     
}


export const orderDetailReducer = (state = {}, action)=>{
    switch (action.type){
        case orderConstants.ORDER_DETAIL_REQUEST:
            return {
                loading: true
            }

        case orderConstants.ORDER_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case orderConstants.ORDER_DETAIL_SUCCESS:
            return {
                loading: true , order: action.payload
            }

        case orderConstants.ORDER_DETAIL_RESET:
            return {}

        default:
            return state
    }
     
}