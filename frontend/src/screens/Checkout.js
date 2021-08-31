import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';


import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import FormContainer from '../components/FormContainer';

import {Form,Button, Alert} from 'react-bootstrap'

import {chargeOrder} from '../actions/OrderActions'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useEffect } from 'react';
import { orderConstants } from '../constants/orderConstants';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51JUB2PGQ1KpthHMiDhAxkvZrrqLlRfYel7SVaFhQDfKfXoESXDgqdykvywpwj5B70h1pHF6cHaRykFM039kYUV4G00ba17BwJi');

const CheckoutScreen = ({history}) => {

  const {loading,error,success} = useSelector(state=>state.orderCharge)

  const {order} = useSelector(state=>state.orderDetails)

  const dispatch = useDispatch()

  useEffect(()=>{
    if(success && order){
        const orderId = order._id
        dispatch({'type':orderConstants.ORDER_DETAIL_RESET})
        dispatch({'type':orderConstants.ORDER_CHARGE_RESET})
        history.push(`/order/${orderId}`)
    }
  },[success,order])

  return (
    <Elements stripe={stripePromise}>
      <FormContainer>
         <h2>Complete Your Order</h2> 
         {loading && <Loader/>}
         {error && <Alert variant="danger">{error}</Alert>}
        <CheckoutForm order={order} dispatch={dispatch} />
      </FormContainer>
    </Elements>
  );
};

const CheckoutForm = ({order,dispatch}) => {
  const stripe = useStripe();
  const elements = useElements();


  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);
    
    const {token} = await stripe.createToken(cardElement)
    if(token)
       dispatch(chargeOrder(order._id,token.id,Number(order.totalPrice)))

    //
  };

  return (
        <Form onSubmit={handleSubmit}>
            <CardElement 
                options={{
                    style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                        color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                    },
                }}/>
            <Button type="submit" disabled={!stripe} className="mt-4">
                Pay
            </Button>
        </Form>
  );
};


export default CheckoutScreen