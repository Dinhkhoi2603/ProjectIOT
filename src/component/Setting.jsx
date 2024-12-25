import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import CustomNavbar from './CustomNavbar';
import { ref, get, set } from 'firebase/database';
import { database } from "../firebaseConfig"; // Firebase config
function Home_user() {
    const [rangeValue, setRangeValue] = useState(50); // Initial range value for đèn
    const [rangeValue2, setRangeValue2] = useState(50); // Initial range value for loa

    const maxValue1 = 255; // Max value for đèn
    const maxValue2 = 2400; // Max value for loa

    useEffect(() => {
        // Fetch initial values from Firebase
        const fetchData = async () => {
            try {
                const ledRef = ref(database, 'Setting/led');
                const buzzerRef = ref(database, 'Setting/buzzer');

                const ledSnapshot = await get(ledRef);
                const buzzerSnapshot = await get(buzzerRef);

                if (ledSnapshot.exists()) {
                    setRangeValue(ledSnapshot.val());
                }
                if (buzzerSnapshot.exists()) {
                    setRangeValue2(buzzerSnapshot.val());
                }
            } catch (error) {
                console.error('Error fetching data from Firebase:', error);
            }
        };

        fetchData();
    }, []);

    const handleRangeChange = (e) => {
        setRangeValue(Math.min(e.target.value, maxValue1)); // Update the range value for đèn with max constraint
    };

    const handleRangeChange2 = (e) => {
        setRangeValue2(Math.min(e.target.value, maxValue2)); // Update the range value for loa with max constraint
    };

    const handleInputChange = (e, setter, max) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
            setter(Math.min(value, max)); // Ensure value does not exceed max
        }
    };

    const handleSave = async () => {
        try {
            const ledRef = ref(database, 'Setting/led');
            const buzzerRef = ref(database, 'Setting/buzzer');

            await set(ledRef, rangeValue);
            await set(buzzerRef, rangeValue2);

            alert('Data saved successfully!');
        } catch (error) {
            console.error('Error saving data to Firebase:', error);
            alert('Failed to save data.');
        }
    };

    return (
        <>
            <CustomNavbar />
            <div className="container mt-5 col-5">
                <Card>
                    <Card.Header>Setting</Card.Header>
                    <Card.Body>
                        <div>
                            <div className="d-flex align-items-center">
                                <Form.Label>Độ sáng đèn</Form.Label>
                                <Form.Text className="text-muted ms-auto d-flex align-items-center">
                                    Value:
                                    <Form.Control
                                        type="number"
                                        value={rangeValue}
                                        onChange={(e) => handleInputChange(e, setRangeValue, maxValue1)}
                                        style={{ width: '80px', marginLeft: '10px' }}
                                    />
                                </Form.Text>
                            </div>
                            <Form.Range
                                max={maxValue1} // Đặt max value cho đèn
                                value={rangeValue}
                                onChange={handleRangeChange}
                            />
                        </div>
                        <div>
                            <div className="d-flex align-items-center">
                                <Form.Label>Tần số loa</Form.Label>
                                <Form.Text className="text-muted ms-auto d-flex align-items-center">
                                    Value:
                                    <Form.Control
                                        type="number"
                                        value={rangeValue2}
                                        onChange={(e) => handleInputChange(e, setRangeValue2, maxValue2)}
                                        style={{ width: '80px', marginLeft: '10px' }}
                                    />
                                </Form.Text>
                            </div>
                            <Form.Range
                                max={maxValue2} // Đặt max value cho loa
                                value={rangeValue2}
                                onChange={handleRangeChange2}
                            />
                        </div>
                        <div>
                            <Button
                                variant="primary"
                                className="mt-4 w-100"
                                onClick={handleSave}
                            >
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
