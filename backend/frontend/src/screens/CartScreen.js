import React,{useEffect} from 'react'
import { ListGroup,Row,Image,Col, Card } from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { addToCart, removeCart } from '../actions/cartActions';
import CartItemQuantity from '../components/CartItemQuantity';
import Message from '../components/Message'


function CartScreen({match,location,history}) {

    const dispatch = useDispatch();
    const productId = match.params.id;
    const qty =  location.search? Number(location.search.split('=')[1]) : 1; 
    let cartItems = useSelector(state=>state.cart.cartItems);
    //let {cartItems} = cart

    useEffect(()=>{
       if(productId)
         dispatch(addToCart(productId,qty));  
    },[dispatch,productId,qty])

    const removeFromCart = (id) => {
        dispatch(removeCart(id));   
    }

    const checkoutHandler = () => {
        history.push('/shipping')   
    }

    return (
        <Row>
            <Col md={8}>
                <h1 className="mb-5">Shopping Cart</h1>
                {
                    cartItems.length === 0 ?
                    (<Message variant='info'>Your Cart is empty</Message>)
                    : (
                        <ListGroup variant="flush">
                            {
                                    cartItems.map((item)=>{
                                    return (<ListGroup.Item key={item.product}>
                                        <Row className="align-items-center">
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/products/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={2}>
                                                <strong>${item.price}</strong>
                                            </Col>
                                            <Col md={3}>
                                                <CartItemQuantity key={item.qty} qtyy={item.qty} handleChange={(quantity)=>{dispatch(addToCart(item.product,quantity))}} product={item.product} inStock={item.countInStock} />
                                            </Col>
                                            <Col md={1}>
                                                <button className="btn" onClick={()=>{removeFromCart(item.product)}}>
                                                    <span className="fa fa-trash text-danger"></span>
                                                    <strong className="inline-block mx-2">Remove</strong>
                                                </button>
                                            </Col>

                                            <Col>
                                            </Col>

                                        </Row>
                                    </ListGroup.Item>)
                                })
                            }
                        </ListGroup>
                    )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="p-3">
                            <h2>
                                Sub Total {cartItems.reduce((acc,item)=>acc + item.qty,0)} items
                            </h2>
                            <span>$ {cartItems.reduce((acc,item)=>acc + item.qty*item.price,0 ).toFixed(2)} </span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <button 
                             type="button"
                             className="btn btn-dark w-100"
                             disabled={cartItems.length===0}
                             onClick={checkoutHandler}
                            >
                               Proceed to Checkout
                            </button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
