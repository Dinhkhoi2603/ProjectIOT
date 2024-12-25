import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ref, get } from 'firebase/database'; // Import hàm cần thiết từ Firebase
import { database } from '../firebaseConfig'; // Đảm bảo rằng đường dẫn này đúng với tệp firebase.js của bạn
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const [username, setuserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username === '' || password === '') {
            setError('Please fill in all fields');
            return;
        }
        
        setError('');

        // Kiểm tra xem tên người dùng có tồn tại không
        try {
            const userRef = ref(database, 'users/' + username);
            const snapshot = await get(userRef);

            if (!snapshot.exists()) {
                setError('Username does not exist');
                return;
            }

            // Lấy thông tin người dùng từ snapshot
            const userData = snapshot.val();

            // Kiểm tra mật khẩu
            if (userData.password !== password) {
                setError('Incorrect password');
                return;
            }

            // Nếu tên người dùng và mật khẩu đều đúng, chuyển hướng đến trang chính
            console.log('Login successful');
            navigate('/home_user', { state: { user: userData } }); // Gửi thông tin người dùng

        } catch (error) {
            console.error('Error logging in:', error);
            setError('Error logging in. Please try again.');
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Smart Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="ms-auto">
                            <Nav.Link href="register">Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <h3 className="text-center">Login</h3>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicUserName">
                                <Form.Label>UserName</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setuserName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword" className="mt-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="mt-4 w-100">
                                Submit
                            </Button>

                            <Button
                                variant="link"
                                onClick={handleRegisterRedirect}
                                className="mt-3 w-100"
                            >
                                Don't have an account? Register here
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Login;
