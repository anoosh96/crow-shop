import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {Navbar,Nav,Container,NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {logoutUser} from '../actions/userActions'

function Header() {

    const dispatch = useDispatch()
    const {userInfo} = useSelector(state=>state.userLogin)


    const logoutHander = (e) => {
         //
         dispatch(logoutUser())
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    
                    <LinkContainer to="/">
                      <Navbar.Brand>Crow Shop</Navbar.Brand>
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
                                <Nav.Link >Cart</Nav.Link>
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
                                <Nav.Link >Login</Nav.Link>
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
