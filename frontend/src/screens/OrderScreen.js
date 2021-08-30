import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Col, ListGroup, Row, Image, Card, Button, Spinner } from 'react-bootstrap'
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getOrder } from '../actions/OrderActions';

function OrderScreen({match}) {

    const orderId = match.params.id;

    const {order,error} = useSelector(state=>state.orderDetails)
    const dispatch = useDispatch()
    useEffect(() => {
        if(!order._id || Number(orderId)!==order._id){
            dispatch(getOrder(orderId));
        }
        
    }, [order,orderId])


    return (
        <div>
            <Row className="mt-4">
                <Col md={8}>
                    <ListGroup variant="flush ">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                {order.shippingaddress.address}, {order.shippingaddress.city}
                                {'  '}
                                {order.shippingaddress.postalCode}
                                {'  '}
                                {order.shippingaddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: {order.paymentMethod}</strong>
                            {
                                order.isPaid?
                                (<Alert variant="success" className="my-2">Order Paid at {order.paidAt}</Alert>)

                                :

                                (<Alert variant="warning" className="my-2">Order Not Paid!</Alert>)
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items:</h2>
                            {
                                order.orderitem_set.length===0?
                                (
                                    <Alert variant="info">Your Cart is Empty</Alert>
                                )
                                :
                                (
                                    <ListGroup variant="flush">
                                        {
                                            order.orderitem_set.map((item,index)=>{
                                                return (
                                                    <ListGroup.Item key={index}>
                                                        <Row className="align-items-center">
                                                            <Col md={2}>
                                                                <Image src={item.item.image} alt="product" fluid></Image>
                                                            </Col>
                                                            <Col>
                                                                <Link to={`/product/${item.product}`}>{item.item.name}</Link>
                                                            </Col>

                                                            <Col md={4}>
                                                                {item.qty} X {item.item.price} = ${(item.qty*item.item.price).toFixed(2)} 
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
                                        {/* ${order.itemsPrice} */}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Shipping:
                                    </Col>
                                    <Col>
                                        ${order.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Tax:
                                    </Col>
                                    <Col>
                                        ${order.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total:
                                    </Col>
                                    <Col>
                                        ${order.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            
                        </ListGroup>
                    </Card>
                    {error && <Alert variant="danger">{error}</Alert>}
                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen
