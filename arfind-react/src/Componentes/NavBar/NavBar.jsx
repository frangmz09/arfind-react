import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NotificationPanel from '../../Pages/LandingPage/NotificationPanel/NotificationPanel';
import Logo from '../Logo/Logo';
import NavBarButton from '../NavBarButton/NavBarButton';
import PropTypes from 'prop-types';
import { getMisNotificaciones } from '../../services/notificacionesService'; // Importa el servicio
import styles from './NavBar.module.css';

const NavBar = ({ isLoggedIn, onLogout }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]); // Estado para las notificaciones
  const [logoSize, setLogoSize] = useState('50px');
  const location = useLocation();

  useEffect(() => {
    // Cambiar tamaño del logo dependiendo de la ruta
    if (['/landing', '/about', '/contact'].includes(location.pathname)) {
      setLogoSize('200px');
    } else {
      setLogoSize('50px');
    }
  }, [location.pathname]); // Observa solo el pathname

  useEffect(() => {
    // Manejar desplazamiento a los elementos anclados
    const handleScrollToAnchor = () => {
      if (location.hash) {
        const targetElement = document.querySelector(location.hash);
        if (targetElement) {
          const navbarHeight = 80; // Ajusta según el tamaño de tu navbar
          const targetPosition = targetElement.offsetTop - navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }
      }
    };

    handleScrollToAnchor();
  }, [location.hash]); // Observa solo el hash

  useEffect(() => {
    // Cargar notificaciones si el usuario está autenticado
    const fetchNotifications = async () => {
      if (isLoggedIn) {
        try {
          const token = localStorage.getItem('userToken');
          const response = await getMisNotificaciones(token);
          setNotifications(response);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      }
    };
    fetchNotifications();
  }, [isLoggedIn]);

  const handleNotificationClick = () => {
    setIsNotificationOpen((prevState) => !prevState);
  };

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

// Validación de props
NavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default NavBar;
