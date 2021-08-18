import { cartConstants } from "../constants/cartConstants"

const cartReducer = (state = { cartItems:[] }, action) => {
    
    switch (action.type){
       case cartConstants.CART_ADD_ITEM:
           const item = action.payload;
           console.log(state);
           const existItem = state.cartItems.find(x=>x.product === item.product)
       
           if(existItem){
               return {
                   ...state,
                   cartItems: state.cartItems.map(x => 
                       x.product === existItem? item : x 
                   )
               }
           }
           else{
               return {
                   ...state,
                   cartItems: [...state.cartItems,item]
               }
           }

       //case cartConstants.CART_REMOVE_ITEM:


       default:
           return state


    }
}

export default cartReducer