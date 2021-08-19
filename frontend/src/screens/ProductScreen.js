import React,{useState,useEffect} from 'react'
import {Row,Col,Image,ListGroup,Button,Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from '../components/Rating'
import axios from 'axios'
import Loader from '../components/Loader'
import Alert from '../components/Message'

import CartItemQuantity from '../components/CartItemQuantity'

function ProductScreen({match,history}) {
    const [product,setProducts] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [qty,setQty] = useState(0);

    useEffect(()=>{

        setLoading(true);
        axios.get(`/api/products/${match.params.id}`)
        .then((res)=>{
            console.log(res);
            setProducts(res.data);
        })
        .catch((error)=>{
            setError(
                error.response && error.response.data.message
                ? error.response.data.message 
                : error.message
            )
        })
        .finally(()=>{
            setLoading(false);
        })

    },[match])


    const addToCartHandler = (e)=>{
       history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <div>
            <Link className="btn btn-dark my-3" to="/">Go Back</Link>
            {loading?
               <Loader />
                : error?
                   <Alert variant="danger">{error}</Alert>
                   :             
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>

                            <Col md={6}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="p-4">
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="p-4">
                                        <Rating value={product.rating} text={`${product.numReviews} Reviews`}/>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="p-4">
                                        Price: ${product.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item className="p-4">
                                        Availability: {product.countInStock > 0? 'in Stock' : 'Out of Stock'}
                                    </ListGroup.Item>
                                    <ListGroup.Item className="p-4">
                                        Description: {product.description}
                                    </ListGroup.Item>
                                    <ListGroup.Item >
                                        <Row>
                                            <Col xs={4}>
                                                   <CartItemQuantity qtyy={qty} handleChange={(quantity)=>{setQty(quantity)}} inStock={product.countInStock}/>
                                            </Col>
                                            <Col>
                                               <Button 
                                                 className="btn-block w-100" 
                                                 disabled={product.countInStock===0}
                                                 type="button" 
                                                 onClick={addToCartHandler}
                                                 >Add to Cart</Button>
                                            </Col>
                                        
                                        </Row>
                                    </ListGroup.Item>

                                </ListGroup>
                            </Col>
                            
                        </Row>
            }

        </div>
    )
}

export default ProductScreen