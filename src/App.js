import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './component/Login.jsx';
import Register from './component/Register.jsx';
import Home_user from './component/Home_user.jsx';
import Statistic from './component/Statistic.jsx';
import Setting from './component/Setting.jsx';
import { SmokeProvider } from './contexts/SmokeContext.js';
import SmokeAlertModal from './component/SmokeAlertModal.jsx';

function App() {
  return (
    <SmokeProvider>
      <Router>
        <Main />
      </Router>
    </SmokeProvider>
  );
}

function Main() {
  const location = useLocation();
  const showSmokeAlert = location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <>
      {showSmokeAlert && <SmokeAlertModal />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Chỉ cho phép truy cập các trang này nếu đã đăng nhập */}
        <Route path="/home_user" element={<Home_user />} />
        <Route path="/statistic" element={<Statistic />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </>
  );
}

export default App;
