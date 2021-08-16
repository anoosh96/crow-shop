import React from 'react'
import {Row,Col,Image,ListGroup,Button,Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import products from '../products'
import Rating from '../components/Rating'


function ProductScreen({match}) {
    const product = products.find((p)=>p._id==match.params.id)
    return (
        <div>
            <Link className="btn btn-dark my-3" to="/">Go Back</Link>
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
                        <ListGroup.Item className="p-4">
                            <Button className="btn-block w-100" disabled={product.countInStock==0} type="button">Add to Cart</Button>
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                
            </Row>

        </div>
    )
}

export default ProductScreen