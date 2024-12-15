
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { Container, Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import './Home_user.css';
function Home_user() {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="home_user">Smart Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                        <Nav >
                            <Nav.Link href="statistic">Statistic</Nav.Link>
                            <Nav.Link href="setting">setting</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="link" bsPrefix="p-0" id="dropdown-user">
                            <i className="bi bi-person-circle" style={{ fontSize: '24px' }}></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#user-info">Thông tin</Dropdown.Item>
                            <Dropdown.Item href="#settings">Cài đặt</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="#logout">Đăng xuất</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Navbar>
            <div className='p-5'>
                <div className='text-center'>
                    <h1>Hello User1</h1>
                </div>
                <div className='p-3'>
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={6}>
                                <Card style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: 'dotted' }}>
                                    <Card.Body>
                                        <Card.Text className="text-muted">Now</Card.Text>
                                        <Row>
                                            <Col xs={3}>
                                                <div className="weather-icon">
                                                    <span role="img" aria-label="Clear Night" style={{ fontSize: '2.5rem' }}>
                                                        <i class="bi bi-thermometer-half"></i>
                                                    </span>
                                                </div>
                                            </Col>
                                            <Col xs={5}>
                                                <h2 style={{ fontSize: '2.5rem', margin: 0 }}>27°</h2>
                                                <Card.Text style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Temperature</Card.Text>
                                                <Card.Text className="text-muted">
                                                    High: 31° Low: 25° <br />
                                                    Air quality: <span style={{ color: 'orange' }}>Good</span>
                                                </Card.Text>
                                            </Col>

                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: 'dotted' }}>
                                    <Card.Body>
                                        <Card.Text className="text-muted">Now</Card.Text>
                                        <Row>
                                            <Col xs={3}>
                                                <div className="weather-icon">
                                                    <span role="img" aria-label="Clear Night" style={{ fontSize: '2.5rem' }}>
                                                        <i class="bi bi-moisture"></i>
                                                    </span>
                                                </div>
                                            </Col>
                                            <Col xs={5}>
                                                <h2 style={{ fontSize: '2.5rem', margin: 0 }}>58%</h2>
                                                <Card.Text style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Moisture</Card.Text>
                                                <Card.Text className="text-muted">
                                                    High: 58% Low: 45% <br />
                                                    Air quality: <span style={{ color: 'green' }}>Good</span>
                                                </Card.Text>
                                            </Col>

                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
}

export default Home_user;
