import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Form, FormGroup, Button } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'

import FormContainer from '../components/FormContainer'
import {saveShippingAddress} from '../actions/cartActions'

function ShippingScreen() {

    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart


    const [address,setAddress] = useState(shippingAddress.address)
    const [postalCode,setPostalCode] = useState(shippingAddress.postalCode)
    const [city,setCity] = useState(shippingAddress.city)
    const [country,setCountry] = useState(shippingAddress.country) 

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address,postalCode,city,country}));
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1 className="my-4">Shipping</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup controlId="address" className="mb-4">
                    <Form.Label>
                        Address
                    </Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={address}
                        onChange={(e)=>setAddress(e.target.value)}
                    >
                    </Form.Control>
                </FormGroup>
                <FormGroup controlId="postalCode" className="mb-4">
                    <Form.Label>
                        Postal Code
                    </Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={postalCode}
                        onChange={(e)=>setPostalCode(e.target.value)}
                    ></Form.Control>
                </FormGroup>
                <FormGroup controlId="city" className="mb-4"> 
                    <Form.Label>
                        City
                    </Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={city}
                        onChange={(e)=>setCity(e.target.value)}
                    ></Form.Control>
                </FormGroup>
                <FormGroup controlId="country" className="mb-4">
                    <Form.Label>
                        Country
                    </Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={country}
                        onChange={(e)=>setCountry(e.target.value)}
                    ></Form.Control>
                </FormGroup>

                <Button type="submit" variant="primary">Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
