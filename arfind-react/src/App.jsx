import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Context/AuthContext';
import Register from './Pages/LandingPage/Register/Register';
import Login from './Pages/LandingPage/Login/Login';
import Home from './Pages/Home/Home';
import LandingPage from './Pages/LandingPage/LandingPage';
import AccountSettingsPage from './Pages/AccountSettingsPage/AccountSettingsPage';
import PanelMapa from './Pages/PanelMapa/PanelMapa';
import NavBar from './Componentes/NavBar/NavBar';
import Footer from './Componentes/Footer/Footer';
import DetalleProducto from './Pages/PasarelaProductos/DetalleProducto/DetalleProducto';
import AboutUs from './Pages/AboutUs/AboutUs';
import Contact from './Pages/Contact/Contact';
import PagoStatus from './Pages/PasarelaProductos/PagoStatus/PagoStatus';

import './styles/App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AuthRoutes />
      </Router>
    </AuthProvider>
  );
};

const AuthRoutes = () => {
  const { isLoggedIn, handleLogout } = useAuth();

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/landing" />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/mapa" element={isLoggedIn ? <PanelMapa /> : <Navigate to="/login" />} />
          <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/" />} />
          <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} />
          <Route path="/account-settings" element={isLoggedIn ? <AccountSettingsPage /> : <Navigate to="/login" />} />
          <Route path="/pago" element={<PagoStatus />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
