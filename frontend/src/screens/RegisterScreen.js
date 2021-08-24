import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'

import {Link} from 'react-router-dom'
import {Row,Col,Form,Button, FormGroup} from 'react-bootstrap'
import Loader from '../components/Loader'
import Alert from '../components/Message'
import FormContainer from '../components/FormContainer'

import {registerUser} from '../actions/userActions'

function RegisterScreen({location,history}) {

    const [email,setEmail] = useState('')
    const [password,setPassowrd] = useState('')
    const [confirmPassword,setConfirmPassowrd] = useState('')
    const [name,setName] = useState('')
    const [message,setMessage] = useState('')


    const dispatch = useDispatch()
    const userRegister = useSelector(state=>state.userRegister)

    const redirect = location.search? location.search.split('=')[1] : '/' 

    const {error,loading,userInfo} = userRegister

    const submitHandler = (e) => {
        e.preventDefault();

        if(password !== confirmPassword){

            setMessage('Passwords Don\'t match')
        }
        else{
            setMessage('')
            dispatch(registerUser(name,email,password,confirmPassword))     
        }
    }


    useEffect(() => {
        if(userInfo)
            history.push(redirect)
    }, [history,userInfo,redirect])


    return (
        <FormContainer>
            <h1>Register</h1>
             {message && <Alert variant="danger"><span className="fa fa-exclamation-triangle d-inline-block mx-2"></span>{message}</Alert>}
             {error && <Alert variant="danger"><span className="fa fa-exclamation-triangle d-inline-block mx-2"></span>{error}</Alert>}
             {loading && <Loader/>}
            <Form className="mt-4" onSubmit={submitHandler}>
                <FormGroup controlId="email">
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control 
                        required
                        type="email"
                        value={email} 
                        placeholder="Enter Your Email"
                        onChange={(e)=>setEmail(e.target.value)}
                    >
                    </Form.Control>
                </FormGroup>
                <FormGroup controlId="name" className="mt-4">
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control 
                        required
                        type="text" 
                        value={name}
                        placeholder="Enter Your Name"
                        onChange={(e)=>setName(e.target.value)}
                    >
                    </Form.Control>
                </FormGroup>
                <FormGroup controlId="password" className="mt-4">
                    <Form.Label> 
                        Password
                    </Form.Label>
                    <Form.Control 
                        required
                        type="password" 
                        value={password}
                        placeholder="Enter Your Password"
                        onChange={(e)=>setPassowrd(e.target.value)}
                        className={message!==''?'border border-danger':''}
                    >
                    </Form.Control>
                </FormGroup>
                <FormGroup controlId="confirmpassword" className="mt-4">
                    <Form.Label> 
                        Confirm Password
                    </Form.Label>
                    <Form.Control 
                        required
                        type="password" 
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassowrd(e.target.value)}
                        className={message!==''?'border border-danger':''}
                    >
                    </Form.Control>
                </FormGroup>
                <Button type="submit" variant="primary" className="mt-4">Register</Button>

                <Row className="mt-2">
                    <Col>
                        Already a Customer ? <Link to="/login">Login Now</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default RegisterScreen
