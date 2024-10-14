import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NotificationItem from '../NotificationItem/NotificationItem'; // Verifica la ruta del archivo
import './NotificationPanel.css'; // Verifica la ruta del archivo

const NotificationPanel = ({ notifications, onClose }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    // Abre el panel cuando hay notificaciones
    if (notifications.length > 0) {
      setIsPanelOpen(true);
    } else {
      // Cierra el panel con un retraso para permitir la animación
      setIsPanelOpen(false);
    }
  }, [notifications]);

  return (
    <>
      <div className={`notification-panel-overlay ${isPanelOpen ? 'show' : ''}`} onClick={onClose}></div> {/* Capa oscura de fondo */}
      <div className={`notification-panel ${isPanelOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={onClose}><img src="/images/x.png"/></button>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
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
