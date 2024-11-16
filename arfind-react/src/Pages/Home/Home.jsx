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

  const fetchProducts = async () => {
    try {
      const productsResponse = await getProductos();
      if (productsResponse.length === 0) {
        setError((prevError) =>
          prevError ? `${prevError} No se encontraron productos.` : 'No se encontraron productos.'
        );
      } else {
        setProducts(productsResponse);
      }
    } catch (err) {
      console.error('Error obteniendo los productos:', err);
      setError((prevError) =>
        prevError ? `${prevError} Error obteniendo productos.` : 'Error obteniendo productos.'
      );
    }
  };

  const fetchDevices = async (token) => {
    try {
      const devicesResponse = await getDispositivosByUsuario(token);
      if (devicesResponse.length === 0) {
        setError((prevError) =>
          prevError ? `${prevError} No se encontraron dispositivos.` : 'No se encontraron dispositivos.'
        );
      } else {
        setDevices(devicesResponse);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.warn('No se encontraron dispositivos para este usuario.');
        setDevices([]); // Mantén devices vacío pero sin bloquear la carga de productos
      } else {
        console.error('Error obteniendo los dispositivos:', err);
      }
    }
  };

  useEffect(() => {
    document.title = 'ARfind - Panel de Control';

    const token = localStorage.getItem('userToken');
    if (!token) {
      setError('No se ha encontrado el token de autenticación.');
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      await Promise.allSettled([fetchProducts(), fetchDevices(token)]);
      setIsLoading(false);
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
                    ? typeof device.ult_actualizacion === 'string' ||
                      device.ult_actualizacion instanceof Date
                      ? new Date(device.ult_actualizacion).toLocaleString()
                      : new Date(device.ult_actualizacion.seconds * 1000).toLocaleString()
                    : 'Sin actualizaciones'
                }
                updateRate={'15 minutos'}
                battery={`${device.bateria?.toFixed(0) || 0}%`}
                imageSrc={`https://via.placeholder.com/150`}
              />
            ))
          )}
        </div>
        <div className="pasarela-home">
          <h2 className='home-title'>Realiza el pedido de tu próximo dispositivo</h2>
          {products.length === 0 ? (
            <p>No hay productos disponibles.</p>
          ) : (
            <PasarelaProductos products={products} height="150px" />
          )}
        </div>

        {/* Mostrar el botón solo si hay dispositivos */}
        {devices.length > 0 && (
          <div className="extraButtons">
            <a href="/mapa" className="visualizar-ubicacion-btn">
              Visualizar ubicación de todos los dispositivos
            </a>
          </div>
        )}

        <div className="home-buttons">
          <BtnAux image="/images/settings.png" altText="Configuración" link="/" />
          <BtnAux image="/images/support.png" altText="Soporte" link="/support" />
        </div>
      </div>
    </div>
  );
};

export default Home;
