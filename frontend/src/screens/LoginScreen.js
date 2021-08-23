import React from 'react'
import {useDispatch} from 'react-redux'

import {Link} from 'react-router-dom'
import {Row,Col,Form,Button, FormGroup} from 'react-bootstrap'
import Loader from '../components/Loader'
import Alert from '../components/Message'
import FormContainer from '../components/FormContainer'

import {loginUser} from '../actions/userActions'

function LoginScreen() {
    return (
        <FormContainer>
            <h1>Sign in</h1>

            <Form className="mt-4">
                <FormGroup controlId="email">
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter Your Email"
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
