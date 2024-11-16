import React from 'react';
import './AboutUs.css'; // Importa el archivo CSS
import geolocalizador from '/images/gps_tracker.png'; // Asegúrate de que la imagen esté en la carpeta correcta

const AboutUs = () => {
  return (
    <div style={styles.container}>
      
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>Sobre Nosotros</h1>
      </header>

      {/* Section: Intro */}
      <section style={styles.section}>
        <h2 style={styles.subtitle}>¿Quiénes Somos?</h2>
        <div style={styles.introContent}>
          <p style={styles.paragraph}>
          En <span style={{ color: '#0D8BFF', fontWeight: 'bold' }}>AR</span><span style={{ color: '#252525', fontWeight: 'bold' }}>find</span>, somos una empresa especializada en soluciones de geolocalización para el seguimiento y gestión de dispositivos en tiempo real. Ofrecemos plataformas innovadoras para empresas y familias que necesitan rastrear activos y proteger a sus seres queridos. Nuestro compromiso es brindar una experiencia de rastreo avanzada, confiable y fácil de usar, asegurando la protección y privacidad de los datos.          </p>
          <img src={geolocalizador} alt="GPS Device" style={styles.image} />
        </div>
      </section>

      {/* Section: Our Values */}
      <section style={styles.section}>
        <h2 style={styles.subtitle}>Nuestros Valores</h2>
        <div style={styles.valuesContainer}>
          <div className="card-value">
            <h3 className="valueTitle">Seguridad y Privacidad</h3>
            <p className="cardText">
              Protegemos tus datos con estándares de seguridad avanzados, cumpliendo con todas las regulaciones de privacidad para ofrecerte tranquilidad.
            </p>
          </div>
          <div className="card-value">
            <h3 className="valueTitle">Facilidad de Uso</h3>
            <p className="cardText">
              ARfind está diseñado para ser accesible y fácil de usar, incluso para quienes no tienen conocimientos técnicos. La plataforma está pensada para cualquier usuario que necesite rastrear dispositivos rápidamente.
            </p>
          </div>
          <div className="card-value">
            <h3 className="valueTitle">Innovación</h3>
            <p className="cardText">
              Siempre buscamos mejorar nuestra plataforma, integrando nuevas funciones y características para ofrecerte una experiencia de geolocalización más avanzada y eficiente.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Our Mission */}
      <section style={styles.section}>
        <h2 style={styles.subtitle}>Nuestra Misión</h2>
        <p style={styles.paragraphMission}>
          Nuestra misión es proporcionar una solución de geolocalización accesible y confiable que ayude a proteger lo que más valoras. A través de ARfind, buscamos empoderar a los usuarios con herramientas intuitivas que faciliten el seguimiento de dispositivos en tiempo real, sin importar el lugar o momento.
        </p>
      </section>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Poppins, sans-serif',
    color: '#252525',
    maxWidth: '960px',
    margin: '0 auto',
    padding: '20px',
    lineHeight: '1.6',
  },
  header: {
    textAlign: 'center',
    borderBottom: '1px solid #eaeaea',
  },
  title: {
    fontSize: '2.5em',
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    margin: '40px 0',
  },
  subtitle: {
    fontSize: '1.8em',
    fontWeight: '600',
    color: '#0D8BFF',
    marginBottom: '10px',
    textAlign: 'center',
  },
  paragraphMission: {
    fontSize: '1em',
    color: '#5C5C5C',
    maxWidth: '100%', // Ajustamos el ancho del texto
    textAlign: 'center', // Alineamos el texto a la izquierda
  },
  paragraph: {
    fontSize: '1em',
    color: '#5C5C5C',
    maxWidth: '60%', // Ajustamos el ancho del texto
    textAlign: 'left', // Alineamos el texto a la izquierda
  },
  brandHighlight: {
    color: '#0D8BFF',
    fontWeight: 'bold',
  },
  image: {
    maxWidth: '35%', // Ajustamos el tamaño de la imagen
    height: 'auto',
    marginLeft: '20px',
  },
  introContent: {
    display: 'flex',
    alignItems: 'center', // Alineamos verticalmente
    justifyContent: 'space-between', // Alineamos el texto e imagen a los lados opuestos
    flexWrap: 'wrap', // Aseguramos que se ajuste en pantallas pequeñas
  },
  valuesContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginTop: '20px',
    flexWrap: 'wrap',
  },
};

export default AboutUs;
