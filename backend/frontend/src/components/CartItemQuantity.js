import React,{useState,useEffect} from 'react'

function CartItemQuantity({handleChange,qtyy,inStock}) {

    const [quantity,setQuantity] = useState(qtyy)

    useEffect(() => {
        if(quantity!==qtyy){
            console.log('qty changed: ' + quantity);
            handleChange(quantity);
        }
    }, [quantity])

    const incrementQty = (e) => {
        if(quantity+1 <= inStock){
            setQuantity((prevQty)=>prevQty+1);
            //console.log('qty in comp: ' + quantity)
            
        }
    }

    const decrementQty = (e) =>{
        if(quantity-1 >= 0){
            setQuantity((prevQty)=>prevQty-1);
        }
    }

    return (
        <div className="qty-sel d-flex align-items-center border">
            <span className="fa fa-plus px-2 btn" onClick={incrementQty}></span>
            <span className="qty px-2 flex-grow col text-center">{quantity}</span>
            <span className="fa fa-minus px-2 btn" onClick={decrementQty}></span>
        </div>
    )
}

export default CartItemQuantity
