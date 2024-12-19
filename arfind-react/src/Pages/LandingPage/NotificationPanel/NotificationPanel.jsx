import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NotificationItem from '../../../Componentes/NotificationItem/NotificationItem';
import './NotificationPanel.css';

const NotificationPanel = ({ notifications, onClose }) => {
  const [sortedNotifications, setSortedNotifications] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    // Ordenar notificaciones por fecha_envio (_seconds) en orden descendente
    const sorted = [...notifications].sort(
      (a, b) => (b.fecha_envio?._seconds || 0) - (a.fecha_envio?._seconds || 0)
    );
    setSortedNotifications(sorted);

    // Abrir el panel siempre que se renderiza
    setIsPanelOpen(true);
  }, [notifications]);

  const handleClose = () => {
    setIsPanelOpen(false); // Aplica la clase para la animación de cierre
    setTimeout(onClose, 300); // Espera 300ms antes de cerrar completamente (duración animación)
  };

  return (
    <>
      <div
        className={`notification-panel-overlay ${isPanelOpen ? 'show' : ''}`}
        onClick={handleClose}
      ></div>
      <div className={`notification-panel ${isPanelOpen ? 'open' : ''}`}>
        {/* Botón para cerrar el panel */}
        <button className="close-button" onClick={handleClose}>
          <img src="/images/x.png" alt="Cerrar" />
        </button>

        {/* Renderizar notificaciones */}
        {sortedNotifications.length > 0 ? (
          sortedNotifications.map((notification, index) => (
            <NotificationItem key={index} notification={notification} />
          ))
        ) : (
          <p className="no-notifications">No tienes notificaciones</p>
        )}
      </div>
    </>
  );
};

NotificationPanel.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NotificationPanel;
