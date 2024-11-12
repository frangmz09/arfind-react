import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NotificationPanel from '../NotificationPanel/NotificationPanel';
import Logo from '../Logo/Logo';
import NavBarButton from '../NavBarButton/NavBarButton';
import './NavBar.css';
import { useLocation } from 'react-router-dom';

const NavBar = ({ isLoggedIn, onLogout }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [logoSize, setLogoSize] = useState('50px');  // Estado para el tamaño del logo
  const location = useLocation();  // Hook para detectar cambios de ruta

  const notifications = [
    { icon: '/images/icon.png', type: 'info', title: 'Nueva actualización', message: 'Se ha actualizado la versión del sistema.' },
    { icon: '/images/icon.png', type: 'info', title: 'Nueva actualización', message: 'Se ha actualizado la versión del sistema.' },
  ];

  const handleNotificationClick = () => {
    console.log('Notification button clicked');
    setIsNotificationOpen(prevState => !prevState);
  };

  // useEffect para actualizar el tamaño del logo cuando cambia la ruta
  useEffect(() => {
    // Establecemos el tamaño del logo dependiendo de la ruta
    if (location.pathname === '/landing') {
      setLogoSize('200px');
    } else {
      setLogoSize('50px');
    }
  }, [location]);  // Dependemos de 'location' para que se ejecute en cada cambio de ruta

  return (
    <div className="navbar">
      <Link to="/" className="navbar-logo-link">
        {/* Ahora el tamaño del logo depende del estado 'logoSize' */}
        <Logo type="icon" altText="Logo" size={logoSize} />
      </Link>

      {/* Links siempre visibles */}
      <div className="navbar-links">
        <Link to="/landing#home" className="navLink">
          Home
        </Link>
        <Link to="/landing#productos" className="navLink">
          Productos
        </Link>
        <Link to="/landing#planes" className="navLink">
          Planes
        </Link>
      </div>

      {/* Condicional para mostrar iconos si el usuario está logueado */}
      {isLoggedIn ? (
        <div className="navbar-icons">
          <NavBarButton 
            imgSrc="/images/notification.png" 
            altText="Notificaciones" 
            onClick={handleNotificationClick} 
          />
          <NavBarButton 
            imgSrc="/images/account.png" 
            altText="Tu cuenta"
            isProfileButton={true}
            onLogout={onLogout}
          />
        </div>
      ) : (
        <Link to="/login">
          <button className="login-button">INGRESAR</button>
        </Link>
      )}

      {isNotificationOpen && (
        <NotificationPanel 
          notifications={notifications} 
          onClose={() => setIsNotificationOpen(false)}
        />
      )}
    </div>
  );
};

export default NavBar;
