import React from 'react';
import styles from './Toast.module.css';

const Toast = ({ message, type = 'success' }) => {
  const toastClass = `${styles.toast} ${
    type === 'error' ? styles.error : styles.success
  }`;

  return <div className={toastClass}>{message}</div>;
};

export default Toast;
