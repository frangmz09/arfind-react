import React from 'react';
import Logo from '../../Componentes/Logo/Logo';
import geolocalizador from '/images/gps_tracker.png';
import arfindAutos from '/images/arfind_autos.png';
import arfindPersonas from '/images/arfind_personas.png';
import arfindMascotas from '/images/arfind_mascotas.png';
import iconMobile from '/images/iconMobile.png';
import iconWeb from '/images/iconWeb.png';
import vector1 from '/images/vector_1.png';
import vector2 from '/images/vector_2.png';

const App = () => {
  return (
    <div style={styles.container}>
      <img src={vector1} alt="GPS Device" style={styles.vector1} />
      <img src={vector2} alt="GPS Device" style={styles.vector2} />

      {/* Header */}
      <header style={styles.header}>
        <Logo type="logo" altText="Logo" size="13rem" />
        <nav style={styles.nav}>
          <a href="#home" style={styles.navLink}>Home</a>
          <a href="#productos" style={styles.navLink}>Productos</a>
          <a href="#planes" style={styles.navLink}>Planes</a>
          <button style={styles.loginButton}>INGRESAR</button>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Realizá seguimiento de tus puntos de interés <br />
          <span style={styles.highlight}>cuando quieras, donde quieras</span>
        </h1>
        <p style={styles.heroDescription}>
          <span style={{ color: '#0D8BFF', fontWeight: 'bold' }}>AR</span>
          <span style={{ color: '#000000', fontWeight: 'bold' }}>find</span> es un sistema integral de geolocalización, cuyo objetivo es proporcionar una manera sencilla y cómoda
          de realizar un seguimiento en tiempo real de dispositivos localizadores, facilitando también la gestión de los mismos.
        </p>
        <img src={geolocalizador} alt="GPS Device" style={styles.heroImage} />
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <h2 style={styles.featuresHeading}>Realizá seguimiento de tus dispositivos mediante nuestra</h2>
        <div style={styles.featuresContainer}>
          <div style={styles.feature}>
            <div style={styles.featureIconWeb}><img src={iconWeb} alt="iconWeb" /></div>
            <p style={styles.featureText}>Aplicación Web</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIconMobile}><img src={iconMobile} alt="Mobile" /></div>
            <p style={styles.featureText}>Aplicación Mobile</p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section style={styles.products}>
        <h2 style={styles.sectionTitle}>Conocé nuestros diversos productos</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ width: '80vh', color: '#868686' }}>
            Nuestros dispositivos de geolocalización están diseñados para brindar tranquilidad, cuidando de tus objetos preciados, tus seres queridos, y hasta tus mascotas.
          </p>
        </div>

        {/* Personas */}
        <div style={styles.product}>
          <div style={styles.productText}>
            <h2 style={styles.productTitle}>
              <span style={{ color: '#000000', fontWeight: 'bold' }}>ARfind </span>
              <span style={{ color: '#0D8BFF', fontWeight: 'bold' }}>Personas</span>
            </h2>
            <p style={styles.productTextDesc}>Ideal para cuidar a tus seres queridos, como niños y personas mayores. Con nuestros dispositivos, sabés que siempre estarán ubicados y seguros.</p>
          </div>
          <img src={arfindPersonas} alt="Personas" style={styles.productImage} />
        </div>

        {/* Mascotas */}
        <div style={styles.product}>
          <img src={arfindMascotas} alt="Mascotas" style={styles.productImage} />
          <div style={styles.productText}>
            <h2 style={styles.productTitleB}>
              <span style={{ color: '#000000', fontWeight: 'bold' }}>ARfind </span>
              <span style={{ color: '#0D8BFF', fontWeight: 'bold' }}>Mascotas </span>
            </h2>
            <p style={styles.productTextDescB}>Mantén a tus amigos peludos siempre en tu radar. La tecnología de geolocalización para mascotas te permite encontrarlos al instante.</p>
          </div>
        </div>

        {/* Autos */}
        <div style={styles.product}>
          <div style={styles.productText}>
            <h2 style={styles.productTitle}>
              <span style={{ color: '#000000', fontWeight: 'bold' }}>ARfind </span>
              <span style={{ color: '#0D8BFF', fontWeight: 'bold' }}>Autos</span>
            </h2>
            <p style={styles.productTextDesc}>Mantené tu vehículo siempre ubicado y seguro con nuestros dispositivos de geolocalización en tiempo real, diseñados para proteger desde autos hasta objetos de alto valor.</p>
          </div>
          <img src={arfindAutos} alt="Autos" style={styles.productImage} />
        </div>
      </section>

      {/* Plans Section */}
      <section style={styles.plans}>
        <h2 style={styles.sectionTitle}>Conocé nuestros Planes</h2>
        <div style={styles.plansContainer}>
          {/* Plan Básico */}
          <div style={styles.plan}>
            <h3 style={styles.planTitle}>Plan Básico</h3>
            <p style={styles.planPrice}>$5.99</p>
            <p style={styles.planDescription}>Rastreo sencillo con actualización <b>cada 30 minutos</b>, ideal para quienes buscan protección accesible. Comparte la ubicación <b>con una persona</b>.</p>
            <button style={styles.planButton}>Ver más</button>
          </div>

          {/* Plan Premium */}
          <div style={styles.planPremium}>
            <h3 style={styles.planTitlePremium}>Plan Premium</h3>
            <p style={styles.planPricePremium}>$15.99</p>
            <p style={styles.planDescriptionPremium}>Rastreo en tiempo real con actualizaciones <b>cada minuto</b>. Seguridad avanzada para tus seres queridos y vehículos, con opción de compartir <b>con hasta cinco personas</b>.</p>
            <button style={styles.planButtonPremium}>Ver más</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>Protegé lo que más valorás con ARfind. ¿Listo para empezar?</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Poppins, sans-serif',
    color: '#252525',
    maxWidth: '1440px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    background: '#fff',
  },
  logo: {
    width: '150px',
  },
  nav: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  navLink: {
    color: '#000000',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '400',
  },
  loginButton: {
    background: '#0787FF',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
  },
  hero: {
    padding: '60px 40px',
    background: 'rgba(16, 144, 203, 0.10)',
    textAlign: 'left',
  },
  heroTitle: {
    fontSize: '40px',
    fontWeight: '600',
    color: 'black',
    width: '85vh',
    lineHeight: '1.3',
  },
  highlight: {
    color: '#0D8BFF',
  },
  heroDescription: {
    fontSize: '16px',
    color: '#5C5C5C',
    maxWidth: '85vh',
    lineHeight: '1.3',
    margin: '5px 2rem',
  },
  heroImage: {
    width: '200px',
    position: 'absolute',
    right: '20rem',
    bottom: '15rem',
  },
  features: {
    padding: '40px',
    background: 'white',
    textAlign: 'center',
  },
  featuresHeading: {
    fontSize: '24px',
    color: '#252525',
    marginBottom: '20px',
  },
  featuresContainer: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '40px',
  },
  feature: {
    display: 'flex',
    textAlign: 'center',
  },
  featureIconWeb: {
    fontSize: '40px',
    backgroundColor: '#EFEAFF',
    height: '3.5rem',
    width: '4rem',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  featureIconMobile: {
    fontSize: '40px',
    backgroundColor: '#FFE5DA',
    height: '3.5rem',
    width: '4rem',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  featureText: {
    padding: '15px',
    fontSize: '16px',
    color: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '400',
  },
  products: {
    padding: '15px 40px',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '30px',
    fontWeight: '600',
    marginBottom: '2rem',
    color: '#000000',
  },
  product: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
    flexDirection: 'row', // Default left-to-right (no change for first & third)
    padding: '0px 100px',
  },
  productText: {
    maxWidth: '500px',
    lineHeight: '1.3',
    color: '#000000',
    fontSize: '20px',
  },
  productImage: {
    width: '50vh',
  },
  productTitle: {
    marginBottom: '15px', // Added margin to give space between title and text
    textAlign: 'left',
  },
  productTitleB: {
    marginBottom: '15px', // Added margin to give space between title and text
    textAlign: 'right',
  },
  plans: {
    padding: '10px 40px',
    textAlign: 'center',
  },
  plansContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
  },
  plan: {
    background: '#F4F4F4',
    borderRadius: '10px',
    padding: '50px',
    width: '35%',
    height: '250px',
  },
  planTitle:{
    padding: '7px',
    fontWeight: 'bold',
    fontSize: '25px',
    color: '#000000'
  },
  planTitlePremium:{
    padding: '7px',
    fontWeight: 'bold',
    fontSize: '25px',
    color:'#FFFFFF'
  },
  planPremium: {
    background: '#0486FF',
    borderRadius: '10px',
    padding: '50px',
    width: '35%',
    height: '250px',
  },
  planPricePremium: {
    fontSize: '25px',
    fontWeight: '600',
    margin: '10px 0px',
    color: '#FFFFFF'
  },
  planPrice: {
    fontSize: '25px',
    fontWeight: '600',
    margin: '10px 0px',
    color: '#0787FF'
  },
  planDescription: {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#545454',
    padding: '30px 0px',
  },
  planButton: {
    background: '#0787FF',
    color: '#FFFFFF',
    padding: '10px 20px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
    width: '45%',
    fontWeight:'bolder',
    fontSize:'20px',
  },
  planDescriptionPremium: {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#FFFFFF',
    padding: '30px 0px',
  },
  planButtonPremium: {
    background: '#FFFFFF',
    color: '#0787FF',
    padding: '10px 20px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
    width: '45%',
    fontWeight:'bolder',
    fontSize:'20px',
  },
  footer: {
    padding: '70px',
    textAlign: 'center',
    background: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#000000',

  },
  productTextDesc :{
    textAlign: 'left',
  },
  productTextDescB :{
    textAlign: 'right',
  },
  vector1 : {
    position: 'absolute',
    right: '0',
    bottom: '0'
  },
  vector2 : {
    position: 'absolute',
    left: '0',
    bottom: '0',
    top: '200px'
  },
  sectionSubTitle: {},
};

export default App;