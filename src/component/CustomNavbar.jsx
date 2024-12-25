import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

function CustomNavbar() {
    const navigate = useNavigate();  // Dùng để điều hướng

    const handleLogout = () => {
        navigate('/login');  // Điều hướng người dùng về trang login
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="home_user">Smart Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                    <Nav>
                        <Nav.Link href="statistic">Statistic</Nav.Link>
                        <Nav.Link href="setting">Setting</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Dropdown align="end">
                    <Dropdown.Toggle variant="link" bsPrefix="p-0" id="dropdown-user">
                        <i className="bi bi-person-circle" style={{ fontSize: '24px' }}></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="/setting">Cài đặt</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item> {/* Gọi hàm logout khi nhấn */}
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;
