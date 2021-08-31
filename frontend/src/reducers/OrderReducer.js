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


export const orderDetailReducer = (state = {order: { shippingaddress:{}, orderitem_set:[] } }, action)=>{
    switch (action.type){
        case orderConstants.ORDER_DETAIL_REQUEST:
            return {
                ...state,
                loading: true
            }

        case orderConstants.ORDER_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case orderConstants.ORDER_DETAIL_SUCCESS:
            return {
                loading: false , order: action.payload
            }

        case orderConstants.ORDER_DETAIL_RESET:
            return {
                order:{
                    shippingaddress:{},
                    orderitem_set:[]
                }
            }

        default:
            return state
    }
     
}


export const orderChargeReducer = (state = {} , action)=>{
    switch (action.type){
        case orderConstants.ORDER_CHARGE_REQUEST:
            return {
                loading: true
            }

        case orderConstants.ORDER_CHARGE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case orderConstants.ORDER_CHARGE_SUCCESS:
            return {
                loading: false ,
                success: true
            }

        case orderConstants.ORDER_CHARGE_RESET:
            return {}

        default:
            return state
    }
     
}


export const myOrderListReducer = (state = {myOrders:[]} , action)=>{
    switch (action.type){
        case orderConstants.MY_ORDER_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }

        case orderConstants.MY_ORDER_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case orderConstants.MY_ORDER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                myOrders: action.payload
            }

        case orderConstants.MY_ORDER_LIST_RESET:
            return {
                myOrders: []
            }

        default:
            return state
    }
     
}