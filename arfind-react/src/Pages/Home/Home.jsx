import React, { useEffect, useState } from 'react';
import './Home.css';
import Logo from '../../Componentes/Logo/Logo';
import BtnAux from '../../Componentes/BtnAux/BtnAux';
import DispositivoCard from '../../Componentes/DispositivoCard/DispositivoCard';
import PasarelaProductos from '../../Componentes/PasarelaProductos/PasarelaProductos';
import LoadingScreen from '../../Componentes/LoadingScreen/LoadingScreen'; // Importa la pantalla de carga
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig.js'; // Ajusta la ruta según tu estructura de archivos


const Home = () => {
  const [products, setProducts] = useState([]);
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  
  useEffect(() => {
    document.title = 'ARfind - Panel de Control'; 

    const fetchData = async () => {
      try {
        const [productsSnapshot, devicesSnapshot] = await Promise.all([
          getDocs(collection(db, 'productos')),
          getDocs(collection(db, 'dispositivos'))
        ]);

        const productList = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        const deviceList = devicesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setProducts(productList);
        setDevices(deviceList);
        setIsLoading(false); // Detener la carga cuando los datos se han recuperado
      } catch (error) {
        console.error("Error obteniendo los datos: ", error);
        setIsLoading(false); // Asegurar que la pantalla de carga se oculte en caso de error
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingScreen />; // Mostrar la pantalla de carga mientras se cargan los datos
  }

  return (
    <div className="home-page">
      <div className="home-logo">
        <Logo type="logo" altText="Logo" size="13rem" />
      </div>
      <div className="home-content">
        <div className="pasarela-home">
          {/* Pasarela de Productos */}
          <PasarelaProductos 
            products={products} 
            height="150px" // Ajusta el height según tus necesidades
          />
        </div>
        {/* Tarjetas de Dispositivos */}
        <h1 className='home-title'>Tus Dispositivos</h1>
        <div className="home-cards">
          {devices.map((device, index) => (
            <DispositivoCard 
              key={index}
              title={device.plan} // Asume que `usuario` es el título del dispositivo
              lastUpdate={device.ult_actualizacion?.toDate().toLocaleString() || "Sin actualizaciones"} // Convierte la marca de tiempo
              updateRate={'15 minutos'} // Ejemplo de uso del plan como tasa de actualización
              battery={`${device.bateria}%`} // Muestra la batería como porcentaje
              imageSrc={`https://via.placeholder.com/150`} // Asigna una imagen de placeholder o usa una imagen real
            />
          ))}
        </div>

        {/* Enlaces de visualización */}
        <div className='extraButtons'>
          <a href="/mapa" className="visualizar-ubicacion-btn">
            Visualizar ubicación de todos los dispositivos
          </a>
        </div>

        {/* Botones auxiliares */}
        <div className="home-buttons">
          <BtnAux 
            image="/images/settings.png" 
            altText="Configuración" 
            link="/" 
          />
          <BtnAux 
            image="/images/support.png" 
            altText="Soporte" 
            link="/support" 
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
