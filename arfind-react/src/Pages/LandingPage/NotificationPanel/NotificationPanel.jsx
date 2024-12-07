import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NotificationItem from '../../../Componentes/NotificationItem/NotificationItem'; // Verifica la ruta del archivo
import './NotificationPanel.css'; // Verifica la ruta del archivo

const NotificationPanel = ({ notifications, onClose }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [sortedNotifications, setSortedNotifications] = useState([]);

  useEffect(() => {
    // Ordenar notificaciones por fecha_envio (_seconds) en orden descendente
    const sorted = [...notifications].sort(
      (a, b) => b.fecha_envio._seconds - a.fecha_envio._seconds
    );
    setSortedNotifications(sorted);

    // Abrir el panel si hay notificaciones
    if (sorted.length > 0) {
      setIsPanelOpen(true);
    } else {
      setIsPanelOpen(false);
    }
  }, [notifications]);

  return (
    <>
      <div
        className={`notification-panel-overlay ${isPanelOpen ? 'show' : ''}`}
        onClick={onClose}
      ></div>{' '}
      {/* Capa oscura de fondo */}
      <div className={`notification-panel ${isPanelOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={onClose}>
          <img src="/images/x.png" />
        </button>
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
