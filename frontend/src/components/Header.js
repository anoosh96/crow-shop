import React from 'react'
import {Navbar,Nav,Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

function Header() {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    
                    <LinkContainer to="/">
                      <Navbar.Brand>Crow Shop</Navbar.Brand>
                      </LinkContainer>

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                        className="mr-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                        >
                            <LinkContainer to="/cart">    
                                <Nav.Link >Cart</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/login">
                                <Nav.Link >Login</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/about">
                                <Nav.Link >
                                    About
                                </Nav.Link>
                            </LinkContainer>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
