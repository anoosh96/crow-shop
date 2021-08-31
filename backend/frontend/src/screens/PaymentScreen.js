import React,{useState} from 'react'
import { Form, FormGroup, Button } from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'


import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen({history}) {

    const cart = useSelector(state=>state.cart)
    const {paymentMethod} = cart

    const [myPaymentMethod,setMyPaymentMethod] = useState(paymentMethod)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
         e.preventDefault();
         dispatch(savePaymentMethod(myPaymentMethod));
         history.push('/place-order')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            
            <Form onSubmit={submitHandler}>
                <FormGroup className="my-4">
                    <Form.Label as="legend">
                        Select Payment Method
                    </Form.Label>
                    <Form.Check
                    type="radio"
                    label="Paypal"
                    name="paymentMethod"
                    id="paypal"
                    value="PayPal"
                    onChange={(e)=>setMyPaymentMethod(e.target.value)}
                    checked={myPaymentMethod==='PayPal'}
                    />

                    <Form.Check
                    type="radio"
                    label="Master/Visa"
                    id="stripe"
                    name="paymentMethod"
                    value="Stripe"
                    onChange={(e)=>setMyPaymentMethod(e.target.value)}
                    checked={myPaymentMethod==='Stripe'}
                    />
                    
                </FormGroup>

                <Button type="submit" variant="primary">Continue</Button>

            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
