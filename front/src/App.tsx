import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import TopBar from './components/topbar/topbar';
import SideBar from './components/sidebar/sidebar';
import MainPage from './components/mainpage/mainpage';
import Modal from './components/modal/modal';
import './App.css';

import BeforeLogin from './components/loginProfile/beforeLogin';
import AfterLogin from './components/loginProfile/afterLogin';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import LogoutPage from './components/loginProfile/logoutpage';
import { AuthProvider, useAuth } from './auth/authcontext';
import ProtectedRoute from './auth/ProtectedRoute';
import DailySchedule from './components/dailyschedule/dailyschedule';
import PaymentPage from './components/payment/payment';
import Menu from './components/menu/menu';
import PaymentComplete from './components/payment/paymentcomplete';
import WeeklySchedule from "./components/weeklyschedule/weeklyschedule";

const App: React.FC = () => {
  const [isSideBarOpen, setSideBarOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const location = useLocation();

  const handleMenuClick = () => {
    setSideBarOpen(!isSideBarOpen);
  };

  const handleSideBarClose = () => {
    setSideBarOpen(false);
  };

  const handleProfileClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    // 페이지 경로가 변경되면 모달을 닫음
    setModalOpen(false);
  }, [location]);

  return (
    <div className={`app ${isSideBarOpen ? 'shift' : ''}`}>
      <TopBar onMenuClick={handleMenuClick} isSideBarOpen={isSideBarOpen} onProfileClick={handleProfileClick} />
      <SideBar open={isSideBarOpen} onClose={handleSideBarClose} />
      <div className="content">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/afterlogin" element={<AfterLogin />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/dailyschedule" element={<ProtectedRoute><DailySchedule /></ProtectedRoute>} />
          <Route path="/paymentpage" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
          <Route path="/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
          <Route path="/paymentcomplete" element={<ProtectedRoute><PaymentComplete/></ProtectedRoute>}/>
          <Route path="/weeklyschedule" element={<ProtectedRoute><WeeklySchedule/></ProtectedRoute>}/>
        </Routes>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <AuthContent />
      </Modal>
    </div>
  );
};

const AuthContent: React.FC = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <AfterLogin /> : <BeforeLogin />;
};

const AppWrapper: React.FC = () => (
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
);

export default AppWrapper;
