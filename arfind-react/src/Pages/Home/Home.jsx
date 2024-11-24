import React, { useEffect, useState } from 'react';
import './Home.css';
import Logo from '../../Componentes/Logo/Logo';
import BtnAux from '../../Componentes/BtnAux/BtnAux';
import DispositivoCard from '../../Componentes/DispositivoCard/DispositivoCard';
import PasarelaProductos from '../../Componentes/PasarelaProductos/PasarelaProductos';
import LoadingScreen from '../../Componentes/LoadingScreen/LoadingScreen';
import { 
  getDispositivosByUsuario, 
  getDispositivosInvitados, 
  generateCodigoInvitado, 
  updateApodoDispositivo, 
  submitCodigoInvitado 
} from '../../services/dipositivosService';
import { getProductos } from '../../services/productosService';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [ownDevices, setOwnDevices] = useState([]);
  const [invitedDevices, setInvitedDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [codigoInvitado, setCodigoInvitado] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla el estado del modal

  const fetchProducts = async () => {
    try {
      const productsResponse = await getProductos();
      setProducts(productsResponse);
    } catch (err) {
      console.error('Error obteniendo los productos:', err);
      setError('Error obteniendo productos.');
    }
  };

  const fetchDevices = async (token) => {
    try {
      const [ownDevicesResponse, invitedDevicesResponse] = await Promise.all([
        getDispositivosByUsuario(token),
        getDispositivosInvitados(token),
      ]);
      setOwnDevices(ownDevicesResponse);
      setInvitedDevices(invitedDevicesResponse);
    } catch (err) {
      console.error('Error obteniendo los dispositivos:', err);
      setError('Error obteniendo dispositivos.');
    }
  };

  const handleGenerateCodigo = async (deviceId) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await generateCodigoInvitado(deviceId, token);
      setOwnDevices((prevDevices) =>
        prevDevices.map((device) =>
          device.id === deviceId ? { ...device, codigo_invitado: response.codigo_invitado } : device
        )
      );
    } catch (error) {
      console.error('Error generando código de invitado:', error);
      setError('No se pudo generar el código. Intenta nuevamente.');
    }
  };

  const handleEditName = async (deviceId, newName) => {
    try {
      const token = localStorage.getItem('userToken');
      await updateApodoDispositivo(deviceId, newName, token);
      setOwnDevices((prevDevices) =>
        prevDevices.map((device) =>
          device.id === deviceId ? { ...device, apodo: newName } : device
        )
      );
    } catch (error) {
      console.error('Error actualizando el apodo:', error);
      setError('No se pudo actualizar el nombre. Intenta nuevamente.');
    }
  };

  const handleAddInvitedDevice = async () => {
    try {
      const token = localStorage.getItem('userToken');
      await submitCodigoInvitado(codigoInvitado, token);
      setCodigoInvitado('');
      setIsModalOpen(false); // Cierra el modal
      fetchDevices(token); // Actualizar lista de dispositivos
    } catch (error) {
      console.error('Error agregando dispositivo invitado:', error);
      setError('No se pudo agregar el dispositivo. Intenta nuevamente.');
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

        <h1 className="home-title">Tus Dispositivos Propios</h1>
        <div className="home-cards">
          {ownDevices.length === 0 ? (
            <p>No tienes dispositivos propios registrados.</p>
          ) : (
            ownDevices.map((device, index) => (
              <DispositivoCard
                key={index}
                title={device.apodo || 'Sin apodo'}
                lastUpdate={
                  device.ult_actualizacion
                    ? new Date(device.ult_actualizacion._seconds * 1000).toLocaleString()
                    : 'Sin actualizaciones'
                }
                updateRate={'15 minutos'}
                battery={`${device.bateria?.toFixed(0) || 0}%`}
                imageSrc={`https://via.placeholder.com/150`}
                isOwnDevice={true}
                codigoInvitado={device.codigo_invitado}
                onGenerateCodigo={() => handleGenerateCodigo(device.id)}
                onEditName={(newName) => handleEditName(device.id, newName)}
              />
            ))
          )}
        </div>

        <div className="add-invite-button">
          <button onClick={() => setIsModalOpen(true)} className="add-invite-btn">
            Agregar dispositivo Invitado
          </button>
        </div>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
              <p className='add-dispo-inv-title'>Agregar Dispositivo Invitado</p>
              <input
                type="text"
                value={codigoInvitado}
                onChange={(e) => setCodigoInvitado(e.target.value)}
                placeholder="Código de Invitado"
                className="input-invite"
              />
              <button
                className="add-invite-btn-modal"
                onClick={handleAddInvitedDevice}
                disabled={!codigoInvitado.trim()}
              >
                Agregar
              </button>
            </div>
          </div>
        )}

        {invitedDevices.length > 0 && (
          <>
            <h1 className="home-title">Dispositivos Invitados</h1>
            <div className="home-cards">
              {invitedDevices.map((device, index) => (
                <DispositivoCard
                  key={index}
                  title={device.apodo || 'Sin apodo'}
                  lastUpdate={
                    device.ult_actualizacion
                      ? new Date(device.ult_actualizacion._seconds * 1000).toLocaleString()
                      : 'Sin actualizaciones'
                  }
                  updateRate={'15 minutos'}
                  battery={`${device.bateria?.toFixed(0) || 0}%`}
                  imageSrc={`https://via.placeholder.com/150`}
                  isOwnDevice={false}
                />
              ))}
            </div>
          </>
        )}
        {ownDevices.length > 0 && (
          <div className="extraButtons">
            <a href="/mapa" className="visualizar-ubicacion-btn">
              Visualizar ubicación de todos los dispositivos
            </a>
          </div>
        )}
        <div className="pasarela-home">
          <h2 className="home-title">Realiza el pedido de tu próximo dispositivo</h2>
          {products.length === 0 ? (
            <p>No hay productos disponibles.</p>
          ) : (
            <PasarelaProductos products={products} height="150px" />
          )}
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
