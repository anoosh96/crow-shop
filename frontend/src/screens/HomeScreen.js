import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col} from 'react-bootstrap'
// import products from '../products'
import Product from '../components/Product'
//import axios from 'axios'
import {fetchProducts} from '../actions/productActions'


function HomeScreen() {

    const dispatch = useDispatch();
    const productList = useSelector((state)=>state.productList);
    const {loading,error,products} = productList;
    
    useEffect(()=>{
        dispatch(fetchProducts());
    },[])

    
    return (
        <div>
            <h1>Latest Products</h1>
            {loading ? <h2>Loading...</h2>
               : error ? <h3>{error}</h3> 
                 :
                    <Row>
                        {products.map((product)=>(
                            <Col key={product._id} md={6} lg={4} >
                            <Product product={product} />
                            </Col>
                        ))}
                    </Row>
            }
        </div>
    )
}

export default HomeScreen
