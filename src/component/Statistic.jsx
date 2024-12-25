import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { database } from '../firebaseConfig'; // Import Firebase config
import { ref, onValue } from 'firebase/database'; // Import Firebase database functions
import CustomNavbar from './CustomNavbar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Home_user() {
    const [temperatureData, setTemperatureData] = useState(null);
    const [humidityData, setHumidityData] = useState(null);

    // Fetch data from Firebase
    useEffect(() => {
        const historyRef = ref(database, 'system/history'); // Reference to 'system/history' in Firebase

        const unsubscribe = onValue(historyRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const allKeys = Object.keys(data); // Get all keys (timestamps)
                const latestKeys = allKeys.slice(-10); // Get the last 10 keys
                const latestData = latestKeys.reduce((acc, key) => {
                    acc[key] = data[key];
                    return acc;
                }, {});

                const labels = Object.keys(latestData); // Use the latest timestamps as labels
                const tempValues = Object.values(latestData).map((item) => item.temp); // Get 'temp' values
                const humidValues = Object.values(latestData).map((item) => item.humid); // Get 'humid' values

                // Set temperature data
                setTemperatureData({
                    labels,
                    datasets: [
                        {
                            label: 'Temperature (°C)',
                            data: tempValues,
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                        },
                    ],
                });

                // Set humidity data
                setHumidityData({
                    labels,
                    datasets: [
                        {
                            label: 'Humidity (%)',
                            data: humidValues,
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } else {
                console.error('No data available');
            }
        });

        return () => unsubscribe(); // Cleanup listener when component unmounts
    }, []);

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Sensor Data',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Timestamp',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Value',
                },
                beginAtZero: true,
            },
        },
    };


    return (
        <>
            <CustomNavbar />
            <div className="p-5">
                <div className="text-center">
                    <h1>Welcome to the Dashboard</h1>
                </div>
                <div className="p-3">
                    <Tabs defaultActiveKey="temperature" id="data-tabs" className="mb-3">
                        <Tab eventKey="temperature" title="Temperature">
                            {temperatureData ? (
                                <div style={{ width: '80%', height: '300px', margin: '0 auto' }}>
                                    <Bar data={temperatureData} options={chartOptions} />
                                </div>
                            ) : (
                                <p>Loading temperature data...</p>
                            )}
                        </Tab>
                        <Tab eventKey="humidity" title="Humidity">
                            {humidityData ? (
                                <div style={{ width: '80%', height: '300px', margin: '0 auto' }}>
                                    <Bar data={humidityData} options={chartOptions} />
                                </div>
                            ) : (
                                <p>Loading humidity data...</p>
                            )}
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    );
}

export default Home_user;
