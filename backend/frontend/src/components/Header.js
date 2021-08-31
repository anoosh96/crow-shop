import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {Navbar,Nav,Container,NavDropdown,Image} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {logoutUser} from '../actions/userActions'
import { useHistory } from 'react-router-dom'

function Header() {

    const dispatch = useDispatch()
    const {userInfo} = useSelector(state=>state.userLogin)

    const history = useHistory()
    const logoutHander = (e) => {
         //
         dispatch(logoutUser())
         history.push('/login')
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    
                    <LinkContainer to="/">
                      <Navbar.Brand><Image src="/static/images/logo-crow.png" alt="logo" fluid style={{'width':'50px'}}/> {' '} <strong>Crow Shop</strong></Navbar.Brand>
                    </LinkContainer>


                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className="justify-content-md-end">
                        <Nav
                        className="mr-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                        >

                            <LinkContainer to="/about">
                                <Nav.Link >
                                    About
                                </Nav.Link>
                            </LinkContainer> 

                            <LinkContainer to="/cart">    
                                <Nav.Link ><span className="fa fa-shopping-cart px-2"></span>Cart</Nav.Link>
                            </LinkContainer>


                            {userInfo?
                              <NavDropdown title={userInfo.name}>
                                   <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            My Profile
                                        </NavDropdown.Item>
                                   </LinkContainer>
                                   <NavDropdown.Item onClick={(e)=>logoutHander(e)}>
                                       Logout
                                   </NavDropdown.Item>
                              </NavDropdown>
                              :
                            <LinkContainer to="/login">
                                <Nav.Link ><span className="fa fa-user px-2"></span> Login</Nav.Link>
                            </LinkContainer>
                             }
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
