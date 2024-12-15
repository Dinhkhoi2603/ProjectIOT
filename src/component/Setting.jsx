import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

function Home_user() {
    const [rangeValue, setRangeValue] = useState(50); // Initial range value

    const handleRangeChange = (e) => {
        setRangeValue(e.target.value); // Update the range value
    };
    const [rangeValue2, setRangeValue2] = useState(50); // Initial range value

    const handleRangeChange2 = (e) => {
        setRangeValue2(e.target.value); // Update the range value
    };
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home_user">Smart Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                        <Nav >
                            <Nav.Link href="statistic">Statistic</Nav.Link>
                            <Nav.Link href="setting">Setting</Nav.Link>

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
            <div className='container mt-5 col-5 '>
                <Card>
                    <Card.Header>Setting</Card.Header>
                    <Card.Body>
                        <div>
                            <div className="d-flex align-items-center">
                                <Form.Label>Độ sáng đèn</Form.Label>
                                <Form.Text className="text-muted ms-auto">
                                    Value: {rangeValue}
                                </Form.Text>
                            </div>
                            <Form.Range
                                value={rangeValue}
                                onChange={handleRangeChange}
                            />
                        </div>
                        <div>
                            <div className="d-flex align-items-center">
                                <Form.Label>Tần số loa</Form.Label>
                                <Form.Text className="text-muted ms-auto">
                                    Value: {rangeValue2}
                                </Form.Text>
                            </div>
                            <Form.Range
                                value={rangeValue2}
                                onChange={handleRangeChange2}
                            />
                        </div>
                        <div>
                            <Button variant="primary" type="submit" className="mt-4 w-100">
                                Save
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default Home_user;
