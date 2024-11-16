import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NotificationPanel from '../../Pages/LandingPage/NotificationPanel/NotificationPanel';
import Logo from '../Logo/Logo';
import NavBarButton from '../NavBarButton/NavBarButton';
import styles from './NavBar.module.css'; // Importación correcta de CSS Modules

const NavBar = ({ isLoggedIn, onLogout }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [logoSize, setLogoSize] = useState('50px');
  const location = useLocation();

  const notifications = [
    { icon: '/images/icon.png', type: 'info', title: 'Nueva actualización', message: 'Se ha actualizado la versión del sistema.' },
    { icon: '/images/icon.png', type: 'info', title: 'Nueva actualización', message: 'Se ha actualizado la versión del sistema.' },
  ];

  const handleNotificationClick = () => {
    setIsNotificationOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (location.pathname === '/landing' || location.pathname === '/about' || location.pathname === '/contact') {
      setLogoSize('200px');
    } else {
      setLogoSize('50px');
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname === '/landing' && location.hash) {
      const targetElement = document.querySelector(location.hash);
      if (targetElement) {
        const navbarHeight = 80;
        const targetPosition = targetElement.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    }
  }, [location]);

  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.navbarLogoLink}>
        <Logo type="icon" altText="Logo" size={logoSize} />
      </Link>

      <div className={styles.navbarLinks}>
        <Link to="/landing#home" className={styles.navLink}>
          Home
        </Link>
        <Link to="/landing#productos" className={styles.navLink}>
          Productos
        </Link>
        <Link to="/landing#planes" className={styles.navLink}>
          Planes
        </Link>
        <Link to="/about" className={styles.navLink}>
          Sobre Nosotros
        </Link>
        <Link to="/contact" className={styles.navLink}>
          Contacto
        </Link>
      </div>

      {isLoggedIn ? (
        <div className={styles.navbarIcons}>
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
          <button className={styles.loginButton}>INGRESAR</button>
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
