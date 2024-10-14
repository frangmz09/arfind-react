import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationPanel from '../NotificationPanel/NotificationPanel';
import Logo from '../Logo/Logo';
import NavBarButton from '../NavBarButton/NavBarButton';
import './NavBar.css';

const NavBar = ({ isLoggedIn, onLogout }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const notifications = [
    { icon: '/images/icon.png', type: 'info', title: 'Nueva actualización', message: 'Se ha actualizado la versión del sistema.' },
    { icon: '/images/icon.png', type: 'info', title: 'Nueva actualización', message: 'Se ha actualizado la versión del sistema.' },
  ];

  const handleNotificationClick = () => {
    console.log('Notification button clicked');
    setIsNotificationOpen(prevState => !prevState);
  };

  return (
    <div className="navbar">
      <Link to="/" className="navbar-logo-link">
        <Logo type="icon" altText="Logo" size="50px" />
      </Link>
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
        <button className="login-button">INGRESAR</button>
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
