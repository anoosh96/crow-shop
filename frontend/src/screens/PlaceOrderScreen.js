import React from 'react'
import { Col, ListGroup, Row, Image, Card, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'

import Alert from '../components/Message'

function PlaceOrderScreen() {

    const cart = useSelector(state=>state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc,item)=>acc+(item.qty*item.price),0).toFixed(2)

    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100

    cart.taxPrice = 0

    cart.totalPrice = Number(cart.itemsPrice+cart.shippingPrice+cart.taxPrice).toFixed(2)


    const placeOrderHandler = (e) => {
        //
        console.log('placing order');
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />

            <Row className="mt-4">
                <Col md={8}>
                    <ListGroup variant="flush ">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                                {'  '}
                                {cart.shippingAddress.postalCode}
                                {'  '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: {cart.paymentMethod}</strong>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items:</h2>
                            {
                                cart.cartItems.length===0?
                                (
                                    <Alert variant="info">Your Cart is Empty</Alert>
                                )
                                :
                                (
                                    <ListGroup variant="flush">
                                        {
                                            cart.cartItems.map((item,index)=>{
                                                return (
                                                    <ListGroup.Item key={index}>
                                                        <Row className="align-items-center">
                                                            <Col md={2}>
                                                                <Image src={item.image} alt="product" fluid></Image>
                                                            </Col>
                                                            <Col>
                                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                            </Col>

                                                            <Col md={4}>
                                                                {item.qty} X {item.price} = ${(item.qty*item.price).toFixed(2)} 
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                )
                                            })
                                        }
                                    </ListGroup>
                                )
                        
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Item:
                                    </Col>
                                    <Col>
                                        ${cart.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Shipping:
                                    </Col>
                                    <Col>
                                        ${cart.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Tax:
                                    </Col>
                                    <Col>
                                        ${cart.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total:
                                    </Col>
                                    <Col>
                                        ${cart.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button 
                                    variant="info"
                                    onClick={placeOrderHandler}
                                    className="w-100"
                                >
                                   Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
