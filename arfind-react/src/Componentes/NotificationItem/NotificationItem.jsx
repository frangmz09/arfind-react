import React from 'react';
import PropTypes from 'prop-types';
import './NotificationItem.css';

const NotificationItem = ({ notification }) => {
  return (
    <div className="notification-item">
      <img src={notification.icon} alt={notification.type} className="notification-icon" />
      <div className="notification-content">
        <h4>{notification.title}</h4>
        <p>{notification.message}</p>
      </div>
    </div>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default NotificationItem;
