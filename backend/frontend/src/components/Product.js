import React from 'react'
import {Card} from 'react-bootstrap'
import Rating from '../components/Rating'
import {Link} from 'react-router-dom'

function Product({product}) {
    return (
        <div>
            <Card className="my-3 p-3 rounded">
                <Link to={`/product/${product._id}`}>
                    <Card.Img src={product.image}  />
                </Link>
                <Card.Body>
                    <Link to={`/product/${product._id}`}>
                        <Card.Title as="div">
                             <strong>{product.name}</strong>
                        </Card.Title>
                    </Link>
                    <Card.Text as="div" className="my-4">
                        <Rating value={product.rating} color="yellow" text={`from ${product.numReviews} Reviews`}/>
                    </Card.Text>
                    <Card.Text as="h3">
                        ${product.price}
                    </Card.Text>



                </Card.Body>
            </Card>
        </div>
    )
}

export default Product
