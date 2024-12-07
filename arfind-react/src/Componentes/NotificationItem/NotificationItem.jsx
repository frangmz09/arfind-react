import React from 'react';
import PropTypes from 'prop-types';
import './NotificationItem.css';

const NotificationItem = ({ notification }) => {
  const defaultIcon = '/images/icon.png'; // Ruta de la imagen por defecto

  return (
    <div className="notification-item">
      <img
        src={notification.icono || defaultIcon} // Usa el ícono de la notificación o la imagen por defecto
        alt={notification.tipo}
        className="notification-icon"
      />
      <div className="notification-content">
        <h4>{notification.tipo}</h4>
        <p>{notification.mensaje}</p>
      </div>
    </div>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    icono: PropTypes.string, // Ya no es obligatorio porque podemos usar una imagen por defecto
    tipo: PropTypes.string.isRequired,
    mensaje: PropTypes.string.isRequired,
  }).isRequired,
};

export default NotificationItem;
