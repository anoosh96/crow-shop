import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col} from 'react-bootstrap'
// import products from '../products'
import Product from '../components/Product'
//import axios from 'axios'
import {fetchProducts,listProductsV1} from '../actions/productActions'


function HomeScreen() {

    const dispatch = useDispatch();
    const productList = useSelector((state)=>state.productList);
    const {loading,error,products} = productList;
    
    useEffect(()=>{
        console.log('action');
        dispatch(fetchProducts());
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
