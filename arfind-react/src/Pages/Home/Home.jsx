import React, { useEffect, useState } from 'react';
import './Home.css';
import Logo from '../../Componentes/Logo/Logo';
import BtnAux from '../../Componentes/BtnAux/BtnAux';
import DispositivoCard from '../../Componentes/DispositivoCard/DispositivoCard';
import PasarelaProductos from '../../Componentes/PasarelaProductos/PasarelaProductos';
import LoadingScreen from '../../Componentes/LoadingScreen/LoadingScreen'; // Importa la pantalla de carga
import axios from 'axios'; // Importa axios

const Home = () => {
  const [products, setProducts] = useState([]);
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar posibles errores
  
  useEffect(() => {
    document.title = 'ARfind - Panel de Control'; 

    const fetchData = async () => {
      try {
        // Obtener el token desde localStorage
        const token = localStorage.getItem('userToken');
        
        // Si no se encuentra el token, mostrar un mensaje de error
        if (!token) {
          setError("No se ha encontrado el token de autenticación.");
          setIsLoading(false);
          return;
        }
    
        // Realizar la solicitud para obtener los productos
        const productsResponse = await axios.get('https://arfindfranco-t22ijacwda-uc.a.run.app/productos/productos');
        if (productsResponse.data.length === 0) {
          setError("No se encontraron productos.");
        } else {
          setProducts(productsResponse.data);
        }
    
        // Realizar la solicitud para obtener los dispositivos
        const devicesResponse = await axios.get('https://arfindfranco-t22ijacwda-uc.a.run.app/dispositivos/getDispositivosByUsuario', {
          headers: {
            'Authorization': `Bearer ${token}`  // Usar el token almacenado
          }
        });
        if (devicesResponse.data.length === 0) {
          setError("No se encontraron dispositivos.");
        } else {
          setDevices(devicesResponse.data);
        }
    
        setIsLoading(false);
      } catch (error) {
        console.error("Error obteniendo los datos: ", error);
        if (error.response && error.response.status === 403) {
          setError("No tienes permisos para acceder a estos datos.");
        } else {
          setError("Ocurrió un error inesperado.");
        }
        setIsLoading(false);
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
        {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error si existe */}
        
        <div className="pasarela-home">
          {/* Pasarela de Productos */}
          {products.length === 0 ? (
            <p>No hay productos disponibles.</p> // Mensaje si no hay productos
          ) : (
            <PasarelaProductos 
              products={products} 
              height="150px" // Ajusta el height según tus necesidades
            />
          )}
        </div>

        <h1 className='home-title'>Tus Dispositivos</h1>
        <div className="home-cards">
          {devices.length === 0 ? (
            <p>No tienes dispositivos registrados.</p> // Mensaje si no hay dispositivos
          ) : (
            devices.map((device, index) => (
              <DispositivoCard 
                key={index}
                title={device.apodo || "Sin apodo"} // Usa el campo "apodo" o muestra "Sin apodo" si está vacío

                // Verificación de `ult_actualizacion` para manejarla según el tipo de dato
                lastUpdate={
                  device.ult_actualizacion 
                    ? (typeof device.ult_actualizacion === "string" || device.ult_actualizacion instanceof Date 
                        ? new Date(device.ult_actualizacion).toLocaleString()  // Si ya es un Date o string, lo convierte
                        : new Date(device.ult_actualizacion.seconds * 1000).toLocaleString() // Si es un timestamp de Firebase
                      )
                    : "Sin actualizaciones"
                }

                updateRate={'15 minutos'} // Muestra la tasa de actualización, ajusta si es necesario
                battery={`${device.bateria?.toFixed(0) || 0}%`} // Muestra batería como porcentaje sin decimales
                imageSrc={`https://via.placeholder.com/150`} // Puedes reemplazar la imagen con otra URL si existe
              />

            ))
          )}
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
