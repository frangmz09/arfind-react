
import React from 'react';
import Login from './Login';
import Register from './Register';
import Notificaciones from './Notificaciones';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      <h1 className={styles.landingPage__title}>Bienvenido a Nuestra App</h1>
      <div className={styles.landingPage__auth}>
        <Login />
        <Register />
      </div>
      <Notificaciones />
    </div>
  );
};

export default LandingPage;
