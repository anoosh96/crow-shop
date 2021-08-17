import {productConstants} from '../constants/productsConstants'

const productListReducer = (state = { products:[] }, action)=>{
    switch (action.type){
        case productConstants.PRODUCT_LIST_SUCCESS:
            return {
                loading: false, products: action.payload
            }

        case productConstants.PRODUCT_LIST_REQUEST:
            return {
                loading: true, products: []
            }

        case productConstants.PRODUCT_LIST_FAIL:
            return {
                loading: false, products: action.payload
            }

        default:
            return state
    }
     
}

export default productListReducer