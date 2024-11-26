import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import Logo from '../../Componentes/Logo/Logo';
import BtnAux from '../../Componentes/BtnAux/BtnAux';
import DispositivoCard from '../../Componentes/DispositivoCard/DispositivoCard';
import PasarelaProductos from '../../Componentes/PasarelaProductos/PasarelaProductos';
import LoadingScreen from '../../Componentes/LoadingScreen/LoadingScreen';
import Toast from '../../Componentes/Toast/Toast';
import GenerateCodeModal from '../../Componentes/Modals/GenerateCodeModal/GenerateCodeModal';
import AddInvitedDeviceModal from '../../Componentes/Modals/AddInvitedDeviceModal/AddInvitedDeviceModal';

import {
  getDispositivosByUsuario,
  getDispositivosInvitados,
  generateCodigoInvitado,
  updateApodoDispositivo,
  submitCodigoInvitado,
} from '../../services/dipositivosService';
import { getProductos } from '../../services/productosService';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [ownDevices, setOwnDevices] = useState([]);
  const [invitedDevices, setInvitedDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [codigoInvitado, setCodigoInvitado] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [generateCodeDevice, setGenerateCodeDevice] = useState(null);

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
      setToastMessage('¡Código generado con éxito!');
      setShowToast(true);
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
      setToastMessage('¡Nombre actualizado!');
      setShowToast(true);
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
      setIsModalOpen(false);
      fetchDevices(token);
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
    <div className={styles.homePage}>
      <div className={styles.homeLogo}>
        <Logo type="logo" altText="Logo" size="13rem" />
      </div>
      <div className={styles.homeContent}>
        {error && <p className={styles.errorMessage}>{error}</p>}

        <h1 className={styles.homeTitle}>Tus Dispositivos Propios</h1>
        <div className={styles.homeCards}>
          {ownDevices.length === 0 ? (
            <p>No tienes dispositivos propios registrados.</p>
          ) : (
            ownDevices.map((device) => (
              <DispositivoCard
                key={device.id}
                title={device.apodo || 'Sin apodo'}
                lastUpdate={
                  device.ult_actualizacion
                    ? new Date(device.ult_actualizacion._seconds * 1000).toLocaleString()
                    : 'Sin actualizaciones'
                }
                updateRate="15 minutos"
                battery={`${device.bateria?.toFixed(0) || 0}%`}
                imageSrc={`https://via.placeholder.com/150`}
                isOwnDevice={true}
                codigoInvitado={device.codigo_invitado}
                onGenerateCodigo={() => setGenerateCodeDevice(device)}
                onEditName={(newName) => handleEditName(device.id, newName)}
              />
            ))
          )}
        </div>

        <button onClick={() => setIsModalOpen(true)} className={styles.panelBtn}>
          Agregar dispositivo Invitado
        </button>

        {isModalOpen && (
          <AddInvitedDeviceModal
            codigoInvitado={codigoInvitado}
            setCodigoInvitado={setCodigoInvitado}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddInvitedDevice}
          />
        )}

        {generateCodeDevice && (
          <GenerateCodeModal
            codigoInvitado={generateCodeDevice.codigo_invitado}
            onGenerateCodigo={() => handleGenerateCodigo(generateCodeDevice.id)}
            onCopyToClipboard={() => {
              navigator.clipboard.writeText(generateCodeDevice.codigo_invitado || '');
              setToastMessage('¡Código copiado al portapapeles!');
              setShowToast(true);
            }}
            onClose={() => setGenerateCodeDevice(null)}
          />
        )}

        {invitedDevices.length > 0 && (
          <>
            <h1 className={styles.homeTitle}>Dispositivos Invitados</h1>
            <div className={styles.homeCards}>
              {invitedDevices.map((device) => (
                <DispositivoCard
                  key={device.id}
                  title={device.apodo || 'Sin apodo'}
                  lastUpdate={
                    device.ult_actualizacion
                      ? new Date(device.ult_actualizacion._seconds * 1000).toLocaleString()
                      : 'Sin actualizaciones'
                  }
                  updateRate="15 minutos"
                  battery={`${device.bateria?.toFixed(0) || 0}%`}
                  imageSrc={`https://via.placeholder.com/150`}
                  isOwnDevice={false}
                />
              ))}
            </div>
          </>
        )}

        {showToast && <Toast message={toastMessage} />}
      </div>
      {ownDevices.length > 0 && (
        <div className={styles.extraButtons}>
          <a href="/mapa" className={styles.panelBtn}>
            Visualizar ubicación de todos los dispositivos
          </a>
        </div>
      )}
      <div className={styles.pasarelaHome}>
        <h2 className={styles.homeTitle}>Realiza el pedido de tu próximo dispositivo</h2>
        {products.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          <PasarelaProductos products={products} height="150px" />
        )}
      </div>
      <div className={styles.homeButtons}>
        <BtnAux image="/images/settings.png" altText="Configuración" link="/" />
        <BtnAux image="/images/support.png" altText="Soporte" link="/support" />
      </div>
    </div>
  );
};

export default Home;
