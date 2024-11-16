
import React from 'react';
import Localizador from './Localizador';
import Mapa from './Mapa';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.home__title}>Bienvenido a la Página Principal</h1>
      <Localizador />
      <Mapa />
    </div>
  );
};

export default Home;
