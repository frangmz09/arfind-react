import React, { useEffect, useState } from 'react';
import './Home.css';
import Logo from '../../Componentes/Logo/Logo';
import BtnAux from '../../Componentes/BtnAux/BtnAux';
import DispositivoCard from '../../Componentes/DispositivoCard/DispositivoCard';
import PasarelaProductos from '../../Componentes/PasarelaProductos/PasarelaProductos';
import LoadingScreen from '../../Componentes/LoadingScreen/LoadingScreen'; // Pantalla de carga
import { getDispositivosByUsuario } from '../../services/dipositivosService'; // Servicio para dispositivos
import { getProductos } from '../../services/productosService'; // Servicio para productos

const Home = () => {
  const [products, setProducts] = useState([]);
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar posibles errores

  useEffect(() => {
    document.title = 'ARfind - Panel de Control';

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('userToken');

        if (!token) {
          setError('No se ha encontrado el token de autenticación.');
          setIsLoading(false);
          return;
        }

        const [productsResponse, devicesResponse] = await Promise.all([
          getProductos(),
          getDispositivosByUsuario(token),
        ]);

        if (productsResponse.length === 0) {
          setError('No se encontraron productos.');
        } else {
          setProducts(productsResponse);
        }

        if (devicesResponse.length === 0) {
          setError('No se encontraron dispositivos.');
        } else {
          setDevices(devicesResponse);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error obteniendo los datos:', error);
        if (error.response && error.response.status === 403) {
          setError('No tienes permisos para acceder a estos datos.');
        } else {
          setError('Ocurrió un error inesperado.');
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="home-page">
      <div className="home-logo">
        <Logo type="logo" altText="Logo" size="13rem" />
      </div>
      <div className="home-content">
        {error && <p className="error-message">{error}</p>}

        <div className="pasarela-home">
          {products.length === 0 ? (
            <p>No hay productos disponibles.</p>
          ) : (
            <PasarelaProductos
              products={products}
              height="150px"
            />
          )}
        </div>

        <h1 className="home-title">Tus Dispositivos</h1>
        <div className="home-cards">
          {devices.length === 0 ? (
            <p>No tienes dispositivos registrados.</p>
          ) : (
            devices.map((device, index) => (
              <DispositivoCard
                key={index}
                title={device.apodo || 'Sin apodo'}
                lastUpdate={
                  device.ult_actualizacion
                    ? (typeof device.ult_actualizacion === 'string' ||
                      device.ult_actualizacion instanceof Date
                        ? new Date(device.ult_actualizacion).toLocaleString()
                        : new Date(
                            device.ult_actualizacion.seconds * 1000
                          ).toLocaleString())
                    : 'Sin actualizaciones'
                }
                updateRate={'15 minutos'}
                battery={`${device.bateria?.toFixed(0) || 0}%`}
                imageSrc={`https://via.placeholder.com/150`}
              />
            ))
          )}
        </div>

        <div className="extraButtons">
          <a href="/mapa" className="visualizar-ubicacion-btn">
            Visualizar ubicación de todos los dispositivos
          </a>
        </div>

        <div className="home-buttons">
          <BtnAux image="/images/settings.png" altText="Configuración" link="/" />
          <BtnAux image="/images/support.png" altText="Soporte" link="/support" />
        </div>
      </div>
    </div>
  );
};

export default Home;
