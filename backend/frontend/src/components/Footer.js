import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
function Footer() {
    return (
        <div>
            <footer>
                <Container>
                    <Row >
                        <Col className="text-center py-2">Copyright &copy; Crow Shop 2021</Col>
                    </Row>
                </Container>
            </footer>
        </div>
    )
}

export default Footer
