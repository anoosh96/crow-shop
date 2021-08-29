import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'

import {Link} from 'react-router-dom'
import {Row,Col,Form,Button, FormGroup,Container} from 'react-bootstrap'
import Loader from '../components/Loader'
import Alert from '../components/Message'
import FormContainer from '../components/FormContainer'

import {getUserDetails,updateUserProfile} from '../actions/userActions'
import { userConstants } from '../constants/userConstants'

function ProfileScreen({location,history}) {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [name,setName] = useState('')
    const [message,setMessage] = useState('')

    const redirect = location.search? location.search.split('=')[1] : '/' 


    const dispatch = useDispatch()

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const userDetails = useSelector(state=>state.userDetails)
    const {error,loading,user} = userDetails


    const userUpdated = useSelector(state=>state.userUpdate)
    const {success} = userUpdated


    const submitHandler = (e) => {
        e.preventDefault();

        if(password !== confirmPassword){

            setMessage('Passwords Don\'t match')
        }
        else{
            setMessage('')
            let params = {
                'first_name': name,
                'username': email,
                'email': email
            }

            if(password!==''){
               params = {
                   ...params,
                   'password': password,
                   'password2': confirmPassword
                }
            }

            dispatch(updateUserProfile(params))
            //     
        }
    }


    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }
        else{
            if(!user || !user.name || success){
                dispatch({type:userConstants.USER_UPDATE_RESET})
                dispatch(getUserDetails('profile'))
            }
            else{
                setName(user.name)
                setEmail(user.email)
            }
        }
        
    }, [history,userInfo,redirect,dispatch,user,success])


    return (
        <Container>
            <Row>
                <Col md={3}>
                    <h2>User Profile</h2>
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
                                type="password" 
                                value={password}
                                placeholder="Enter Your Password"
                                onChange={(e)=>setPassword(e.target.value)}
                                className={message!==''?'border border-danger':''}
                            >
                            </Form.Control>
                        </FormGroup>
                        <FormGroup controlId="confirmpassword" className="mt-4">
                            <Form.Label> 
                                Confirm Password
                            </Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e)=>setConfirmPassword(e.target.value)}
                                className={message!==''?'border border-danger':''}
                            >
                            </Form.Control>
                        </FormGroup>
                        <Button type="submit" variant="primary" className="mt-4">Update Profile</Button>
                    </Form>
                </Col>
                <Col md={9}>
                    <h2>My Orders</h2>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfileScreen
