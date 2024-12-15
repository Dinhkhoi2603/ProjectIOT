import React, { useState } from 'react';
import { Nav, Navbar, Dropdown, Container, Modal, Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary chart components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Home_user() {
    // Data for temperature and humidity charts
    const [showModal, setShowModal] = useState(true);
    const temperatureData = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], // Labels for each day
        datasets: [
            {
                label: 'Temperature (°C)',
                data: [22, 25, 24, 23, 26, 28, 27], // Example temperature data
                backgroundColor: 'rgba(255, 99, 132, 0.6)', // Custom color for the temperature chart
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const humidityData = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'Humidity (%)',
                data: [60, 65, 70, 68, 75, 80, 72],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Chart options (you can adjust titles, axes, etc.)
    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Daily Data', // Title for each chart
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`, // Custom tooltip label
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Day', // X-axis label
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Value', // Y-axis label
                },
                beginAtZero: true,
            },
        },
    };
    const handleShow = () => setShowModal(true);

    // Function to handle modal close
    const handleClose = () => setShowModal(false);
    return (
        <>
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
                            <Dropdown.Item href="#user-info">Thông tin</Dropdown.Item>
                            <Dropdown.Item href="#settings">Cài đặt</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="#logout">Đăng xuất</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Navbar>

            <div className="p-5">
                <div className="text-center">
                    <h1>Hello User1</h1>
                </div>
                <div className="p-3">
                    <Tabs defaultActiveKey="temperature" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="temperature" title="Temperature">
                            <div style={{ width: '80%', height: '300px', margin: '0 auto' }}>
                                <Bar data={temperatureData} options={chartOptions} />
                            </div>
                        </Tab>
                        <Tab eventKey="humidity" title="Humidity">
                            <div style={{ width: '80%', height: '300px', margin: '0 auto' }}>
                                <Bar data={humidityData} options={chartOptions} />
                            </div>
                        </Tab>
                    </Tabs>
                </div>

                <Modal show={showModal} onHide={handleClose} >
                    <Modal.Dialog >
                        <Modal.Header closeButton>
                            <Modal.Title>Cảnh báo</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p style={{ color: 'red' }}>⚠️ Phát hiện có cháy! ⚠️</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal>
            </div >
        </>
    );
}

export default Home_user;
