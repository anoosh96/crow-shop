import React,{useState,useEffect} from 'react'
import {Row,Col} from 'react-bootstrap'
// import products from '../products'
import Product from '../components/Product'
import axios from 'axios'

function HomeScreen() {

    const [products,setProducts] = useState([]);

    useEffect(()=>{
        axios.get('/api/products')
        .then((res)=>{
            console.log(res);
            setProducts(res.data);
        })

    },[])

    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product)=>(
                    <Col key={product._id} md={6} lg={4} >
                       <Product product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen
