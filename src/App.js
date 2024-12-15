import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login.jsx';
import Register from './component/Register.jsx';
import Home from './component/Home.jsx';
import Home_user from './component/Home_user.jsx';
import Statistic from './component/Statistic.jsx';
import Setting from './component/Setting.jsx';
import { app } from "./js/firebase.js";
function App() {
  console.log("Firebase App Initialized:", app);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home_user" element={<Home_user />} />
        <Route path="/statistic" element={<Statistic />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </Router>
  );
}

export default App;