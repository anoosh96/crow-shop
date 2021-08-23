import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'

import {Link} from 'react-router-dom'
import {Row,Col,Form,Button, FormGroup} from 'react-bootstrap'
import Loader from '../components/Loader'
import Alert from '../components/Message'
import FormContainer from '../components/FormContainer'

import {loginUser} from '../actions/userActions'

function LoginScreen({location,history}) {

    const [email,setEmail] = useState('')
    const [password,setPassowrd] = useState('')
    const dispatch = useDispatch()
    const userLogin = useSelector(state=>state.userLogin)

    const redirect = location.search? location.search.split('=')[1] : '/' 

    const {error,loading,userInfo} = userLogin

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser(email,password))     
    }


    useEffect(() => {
        if(userInfo)
            history.push(redirect)
    }, [history,userInfo,redirect])


    return (
        <FormContainer>
            <h1>Sign in</h1>
             {error && <Alert variant="danger"><span className="fa fa-exclamation-triangle d-inline-block mx-2"></span>{error}</Alert>}
             {loading && <Loader/>}
            <Form className="mt-4" onSubmit={submitHandler}>
                <FormGroup controlId="email">
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter Your Email"
                        onChange={(e)=>setEmail(e.target.value)}
                    >
                    </Form.Control>
                </FormGroup>
                <FormGroup controlId="password" className="mt-4">
                    <Form.Label> 
                        Password
                    </Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter Your Password"
                        onChange={(e)=>setPassowrd(e.target.value)}
                    >
                    </Form.Control>
                </FormGroup>
                <Button type="submit" variant="primary" className="mt-4">Sign In</Button>

                <Row className="mt-2">
                    <Col>
                        New Customer ? <Link to="">Register Now</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen
