import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database"; // Thay thế get bằng onValue
import { database } from "../firebaseConfig"; // Firebase config
import { Container, Card, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom"; // Import useLocation
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Home_user.css";
import CustomNavbar from "./CustomNavbar";

function Home_user() {
  const [weatherData, setWeatherData] = useState({ temp: 0, humid: 0 });
  const [highestTemp, setHighestTemp] = useState(null);
  const [lowestTemp, setLowestTemp] = useState(null);
  const [highestHumid, setHighestHumid] = useState(null);
  const [lowestHumid, setLowestHumid] = useState(null);

  // Nhận dữ liệu người dùng từ state
  const location = useLocation();
  const user = location.state?.user;

  // Hàm xử lý cập nhật high/low và lưu vào localStorage
  const updateHistory = (temp, humid) => {
    const storedHighTemp = JSON.parse(localStorage.getItem("highestTemp")) || temp;
    const storedLowTemp = JSON.parse(localStorage.getItem("lowestTemp")) || temp;
    const storedHighHumid = JSON.parse(localStorage.getItem("highestHumid")) || humid;
    const storedLowHumid = JSON.parse(localStorage.getItem("lowestHumid")) || humid;

    const newHighTemp = Math.max(storedHighTemp, temp);
    const newLowTemp = Math.min(storedLowTemp, temp);
    const newHighHumid = Math.max(storedHighHumid, humid);
    const newLowHumid = Math.min(storedLowHumid, humid);

    setHighestTemp(newHighTemp);
    setLowestTemp(newLowTemp);
    setHighestHumid(newHighHumid);
    setLowestHumid(newLowHumid);

    localStorage.setItem("highestTemp", JSON.stringify(newHighTemp));
    localStorage.setItem("lowestTemp", JSON.stringify(newLowTemp));
    localStorage.setItem("highestHumid", JSON.stringify(newHighHumid));
    localStorage.setItem("lowestHumid", JSON.stringify(newLowHumid));
  };

  useEffect(() => {
    const weatherRef = ref(database, "system");

    // Lắng nghe dữ liệu theo thời gian thực
    const unsubscribe = onValue(weatherRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setWeatherData(data); // Cập nhật dữ liệu thời gian thực
        updateHistory(data.temp, data.humid); // Cập nhật high/low nếu cần
      } else {
        console.log("No data available");
      }
    });

    // Cleanup listener khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      <CustomNavbar />
      <div className="p-5">
        <div className="text-center">
          <h1>Hello, {user?.name || "User"}!</h1>
        </div>
        <div className="p-3">
          <Container>
            <Row className="justify-content-center">
              <Col md={6}>
                <Card style={{ padding: "1rem", borderRadius: "10px", border: "dotted" }}>
                  <Card.Body>
                    <Card.Text className="text-muted">Temperature</Card.Text>
                    <Row>
                      <Col xs={3}>
                        <div className="weather-icon">
                          <i className="bi bi-thermometer-half" style={{ fontSize: "2.5rem" }}></i>
                        </div>
                      </Col>
                      <Col xs={9}>
                        <h2 style={{ fontSize: "2.5rem", margin: 0 }}>{weatherData.temp}°</h2>
                        <Card.Text>High: {highestTemp || "--"}° Low: {lowestTemp || "--"}°</Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card style={{ padding: "1rem", borderRadius: "10px", border: "dotted" }}>
                  <Card.Body>
                    <Card.Text className="text-muted">Humidity</Card.Text>
                    <Row>
                      <Col xs={3}>
                        <div className="weather-icon">
                          <i className="bi bi-moisture" style={{ fontSize: "2.5rem" }}></i>
                        </div>
                      </Col>
                      <Col xs={9}>
                        <h2 style={{ fontSize: "2.5rem", margin: 0 }}>{weatherData.humid}%</h2>
                        <Card.Text>High: {highestHumid || "--"}% Low: {lowestHumid || "--"}%</Card.Text>
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
