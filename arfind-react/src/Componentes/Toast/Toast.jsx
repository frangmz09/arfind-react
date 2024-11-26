import React from 'react';
import styles from './Toast.module.css';

const Toast = ({ message }) => <div className={styles.toast}>{message}</div>;

export default Toast;
