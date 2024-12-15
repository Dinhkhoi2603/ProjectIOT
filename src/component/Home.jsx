import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './ExampleCarouselImage';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function UncontrolledExample() {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Smart Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="ms-auto">
                            <Nav.Link href="login">Login</Nav.Link>
                            <Nav.Link href="register">Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='d-flex justify-content-center align-items-center'>
                <Carousel className='w-75'>
                    <Carousel.Item>
                        <ExampleCarouselImage text="First slide" />

                    </Carousel.Item>
                    <Carousel.Item>
                        <ExampleCarouselImage text="Second slide" />

                    </Carousel.Item>
                    <Carousel.Item>
                        <ExampleCarouselImage text="Third slide" />

                    </Carousel.Item>
                </Carousel>
            </div>
        </>
    );
}

export default UncontrolledExample;