import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ref, set, get } from 'firebase/database';
import { database } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Register() {
    const [Name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const navigate = useNavigate(); // Khai báo biến navigate

    const handleRegister = async (e) => {
        e.preventDefault();

        // Kiểm tra mật khẩu và xác nhận mật khẩu
        if (password !== cpassword) {
            console.error('Passwords do not match');
            alert('Passwords do not match. Please try again.'); // Thông báo cho người dùng
            return; // Dừng thực hiện đăng ký
        }

        // Kiểm tra xem userId đã tồn tại hay chưa
        try {
            const userRef = ref(database, 'users/' + username);
            const snapshot = await get(userRef);

            if (snapshot.exists()) {
                console.error('Username already exists');
                alert('Username already exists. Please choose a different one.'); // Thông báo cho người dùng
                return; // Dừng thực hiện đăng ký
            }

            // Ghi thông tin người dùng vào nhánh "users" trong Firebase
            await set(ref(database, 'users/' + username), {
                name: Name,
                username: username,
                email: email,
                password: password, // Thông thường không nên lưu mật khẩu ở đây, bạn nên sử dụng Firebase Authentication
            });
            console.log('User registered successfully');

            // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
            navigate('/login');

            // Reset form after successful registration (optional)
            setName('');
            setUsername('');
            setEmail('');
            setPassword('');
            setCpassword(''); // Reset cpassword
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Smart Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="ms-auto">
                            <Nav.Link href="login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <h3 className="text-center">Register</h3>
                        <Form onSubmit={handleRegister}>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    value={Name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail" className="mt-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                            <Form.Group controlId="formConfirmPassword" className="mt-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={cpassword}
                                    onChange={(e) => setCpassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-4 w-100">
                                Register
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Register;
