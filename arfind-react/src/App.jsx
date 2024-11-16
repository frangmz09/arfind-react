import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Pages/LandingPage/Register/Register';
import Login from './Pages/LandingPage/Login/Login';
import Home from './Pages/Home/Home';
import LandingPage from './Pages/LandingPage/LandingPage';
import AccountSettingsPage from './Pages/AccountSettingsPage/AccountSettingsPage';
import PanelMapa from './Pages/PanelMapa/PanelMapa';
import NavBar from './Componentes/NavBar/NavBar';
import PasarelaProductos from './Componentes/PasarelaProductos/PasarelaProductos';
import Footer from './Componentes/Footer/Footer';
import axios from 'axios';



import DetalleProducto from './Pages/PasarelaProductos/DetalleProducto/DetalleProducto'; 


import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './styles/App.css';
import AboutUs from './Pages/AboutUs/AboutUs';
import Contact from './Pages/Contact/Contact';
const productoEjemplo = {
  imagen: 'https://firebasestorage.googleapis.com/v0/b/arfind.appspot.com/o/perro.png?alt=media&token=c7c4a8e9-5064-4887-ada6-ab55874c483d',
  titulo: 'Producto Ejemplo',
  descripcion: 'Sigue a tu mascota en tiempo real con nuestro dispositivo GPS. Seguridad y tranquilidad en tu móvil.',
  precio: 199.99
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      setIsLoggedIn(false);
      localStorage.removeItem('userToken'); // Elimina userToken del localStorage
      console.log('Sesión cerrada y userToken eliminado');
    }).catch(error => {
      console.error("Error al cerrar sesión: ", error);
    });
  };

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/landing" />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/producto" element={     <DetalleProducto producto={productoEjemplo} />} />
          <Route path="/mapa" element={true ? <PanelMapa /> : <Navigate to="/login" />} />
          <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/" />} />
          <Route path="/login" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
          <Route path="/account-settings" element={true ? <AccountSettingsPage/> : <Navigate to="/login" />} />

        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
