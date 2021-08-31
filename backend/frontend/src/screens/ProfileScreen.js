import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'

import {Link} from 'react-router-dom'
import {Row,Col,Form,Button, FormGroup,Container, Table} from 'react-bootstrap'
import Loader from '../components/Loader'
import Alert from '../components/Message'
import FormContainer from '../components/FormContainer'

import {getUserDetails,updateUserProfile} from '../actions/userActions'
import { getMyOrders } from '../actions/OrderActions'
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

    const {myOrders,error:orderError,loading:orderLoading} = useSelector(state=>state.ordersMy)


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
                dispatch(getMyOrders(userInfo.id))
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
                <Col md={4} className="px-2">
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
                <Col md={8} className="px-5">
                    <h2>My Orders</h2>
                    {orderLoading && <Loader/>}
                    {orderError && <Alert variant="danger">{orderError}</Alert>}
                    {myOrders.length===0? <Alert variant="info">You have no orders yet</Alert>
                     :
                    <Table striped responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myOrders.map((order,index)=>(
                                    
                                     <tr>
                                         <td><Link to={`/order/${order._id}`}>{order._id}</Link></td>
                                         <td>{order.createdAt.substring(0,10)}</td>
                                         <td>${order.totalPrice}</td>
                                         <td>{order.isPaid? order.paidAt.substring(0,10) : <i className="fas fa-times color-red"></i>}</td>
                                         <td>{order.isDelivered? order.deliveredAt.substring(0,10) : <i className="fas fa-times color-red"></i>}</td>

                                    </tr>
                                   )
                                )
                            }
                        </tbody>
                    </Table>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default ProfileScreen
