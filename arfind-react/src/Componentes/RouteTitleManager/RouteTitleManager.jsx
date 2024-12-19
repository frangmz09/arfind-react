import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteTitleManager = () => {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      '/': 'ARFind - Panel de Control',
      '/about': 'ARFind - Sobre Nosotros',
      '/contact': 'ARFind - Contacto',
      '/mapa': 'ARFind - Mapa de Dispositivos',
      '/account-settings': 'ARFind - Configuración de Cuenta',
      '/producto': 'ARFind - Detalle del Producto',
      '/landing': 'ARFind - Inicio',
      '/login': 'ARFind - Inicio de Sesión',
      '/register': 'ARFind - Registrarse',
    };

    const defaultTitle = 'ARFind';
    document.title = titles[location.pathname] || defaultTitle;
  }, [location]);

  return null; // Este componente no renderiza nada visible
};

export default RouteTitleManager;
