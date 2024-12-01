import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import Logo from '../../Componentes/Logo/Logo';
import BtnAux from '../../Componentes/BtnAux/BtnAux';
import DispositivoCard from '../../Componentes/DispositivoCard/DispositivoCard';
import PasarelaProductos from '../../Componentes/PasarelaProductos/PasarelaProductos';
import LoadingScreen from '../../Componentes/LoadingScreen/LoadingScreen';
import Toast from '../../Componentes/Toast/Toast';
import GenerateCodeModal from '../../Componentes/Modals/GenerateCodeModal/GenerateCodeModal';
import AddInvitedDeviceModal from '../../Componentes/Modals/AddInvitedDeviceModal/AddInvitedDeviceModal';
import SettingsModal from '../../Componentes/Modals/SettingsModal/SettingsModal';

import {
  getDispositivosByUsuario,
  getDispositivosInvitados,
  generateCodigoInvitado,
  updateApodoDispositivo,
  submitCodigoInvitado,
  eliminarInvitados,
  cambiarPlan
} from '../../services/dipositivosService';
import { getProductos } from '../../services/productosService';
import { getPlanes } from '../../services/planesService';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [ownDevices, setOwnDevices] = useState([]);
  const [invitedDevices, setInvitedDevices] = useState([]);
  const [planes, setPlanes] = useState([]); // Estado para los planes disponibles
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [codigoInvitado, setCodigoInvitado] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [generateCodeDevice, setGenerateCodeDevice] = useState(null);
  const [settingsDevice, setSettingsDevice] = useState(null); 
  const [locations, setLocations] = useState([]); 
  const navigate = useNavigate();
  const handleViewAllLocations = () => {
    navigate('/mapa', { state: { locations } }); // Pasar ubicaciones al estado del navegador
  };
  const handleViewLocation = (deviceId) => {
    const deviceLocation = locations.find((loc) => loc.id === deviceId);
    if (deviceLocation) {
      navigate('/mapa', { state: { locations: [deviceLocation] } }); // Navegar al mapa con la ubicación específica
    }
  };
  const handleRemoveInvite = async (deviceId, userId) => {
    try {
      const token = localStorage.getItem('userToken');
      await eliminarInvitados(deviceId, [userId], token);
  
      setOwnDevices((prevDevices) =>
        prevDevices.map((device) =>
          device.id === deviceId
            ? {
                ...device,
                detalles_usuarios_invitados: device.detalles_usuarios_invitados.filter(
                  (user) => user.id !== userId
                ),
              }
            : device
        )
      );
    } catch (error) {
      console.error('Error al eliminar invitado:', error);
    }
  };
  
  const handleChangePlan = async (deviceId, newPlanId) => {
    try {
      const token = localStorage.getItem('userToken'); // Obtén el token desde el localStorage
      await cambiarPlan(deviceId, newPlanId, token); // Llama al servicio con los parámetros
  
      // Actualiza el dispositivo con el nuevo plan (opcional si el backend lo maneja)
      setOwnDevices((prevDevices) =>
        prevDevices.map((device) =>
          device.id === deviceId
            ? { ...device, plan: newPlanId }
            : device
        )
      );
  
      setToastMessage('¡Plan cambiado exitosamente!');
      setShowToast(true);
    } catch (err) {
      console.error('Error cambiando el plan:', err);
      setToastMessage('Error al cambiar el plan. Intenta nuevamente.');
      setShowToast(true);
    }
  };

  // Nueva función para obtener los planes desde la API
  const fetchPlanes = async () => {
    try {
      const planesResponse = await getPlanes(); // Llama a la API
      setPlanes(planesResponse); // Guarda los planes en el estado
    } catch (err) {
      console.error('Error obteniendo los planes:', err);
      setError('Error obteniendo planes.');
    }
  };
  useEffect(() => {
    let timer;
    if (showToast) {
      // Oculta el Toast después de 3 segundos
      timer = setTimeout(() => {
        setShowToast(false); // Cambia el estado para ocultar el Toast
      }, 3000);
    }
    return () => clearTimeout(timer); // Limpia el temporizador al desmontar o si cambia el estado
  }, [showToast]);

 
  
  const handleOpenSettingsModal = (deviceId) => {
    const dispositivo = ownDevices.find((device) => device.id === deviceId);
  
    setSettingsDevice({
      id: dispositivo.id,
      apodo: dispositivo.apodo,
      codigoInvitado: dispositivo.codigo_invitado,
      usuariosInvitados: dispositivo.detalles_usuarios_invitados, // Asegúrate de que este campo tenga datos
      refresco: dispositivo.refresco,
      imagen: dispositivo.imagen,
    });
  };
  
  
  

  const handleCloseSettingsModal = () => {
    setSettingsDevice(null); // Cierra el modal
  };

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
      // Hacer las solicitudes de dispositivos en paralelo
      const [ownDevicesResponse, invitedDevicesResponse] = await Promise.all([
        getDispositivosByUsuario(token),
        getDispositivosInvitados(token),
      ]);
  
      // Extraer ubicaciones de dispositivos propios
      const ownDeviceLocations = ownDevicesResponse
        .filter((device) => device.ubicacion) // Verificar que tengan ubicación
        .map((device) => ({
          id: device.id,
          position: {
            lat: device.ubicacion._latitude,
            lng: device.ubicacion._longitude,
          },
          tipoProducto: device.tipo_producto, // ID del tipo de producto
          apodo: device.apodo || 'Sin apodo', // Apodo con valor predeterminado
          imageSrc: device.imagen, // Imagen del dispositivo
        }));
  
        const invitedDeviceLocations = invitedDevicesResponse
        .filter((device) => device.ubicacion) // Asegura que tenga coordenadas
        .map((device) => ({
          id: device.id,
          position: {
            lat: device.ubicacion._latitude,
            lng: device.ubicacion._longitude,
          },
          tipoProducto: device.tipo_producto, // Para el marcador
          apodo: device.apodo || 'Sin apodo', // Nombre predeterminado
          imageSrc: device.imagen, // Imagen del dispositivo
        }));
      
      const allLocations = [...ownDeviceLocations, ...invitedDeviceLocations];      
  
      // Actualizar estados
      setOwnDevices(ownDevicesResponse);
      setInvitedDevices(invitedDevicesResponse);
      setLocations(allLocations); // Actualizar el estado con las ubicaciones
  
      console.log("Dispositivos cargados correctamente:", allLocations);
    } catch (err) {
      console.error("Error obteniendo los dispositivos:", err);
    }
  };
  
  


  const handleOpenGenerateCodeModal = (deviceId) => {
    // Busca el dispositivo por ID
    const device = ownDevices.find((device) => device.id === deviceId);
  
    // Si ya tiene un código, se pasa directamente al modal
    if (device && device.codigo_invitado) {
      setGenerateCodeDevice({ id: deviceId, codigo_invitado: device.codigo_invitado });
    } else {
      // Si no tiene código, inicializamos el modal con código vacío
      setGenerateCodeDevice({ id: deviceId, codigo_invitado: null });
    }
  };
  
  const handleGenerateCodigo = async (deviceId) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await generateCodigoInvitado(deviceId, token);
  
      // Actualizar el dispositivo con el código generado
      setOwnDevices((prevDevices) =>
        prevDevices.map((device) =>
          device.id === deviceId
            ? { ...device, codigo_invitado: response.codigo_invitado }
            : device
        )
      );
  
      setToastMessage("¡Código generado con éxito!");
      setShowToast(true);
  
      return response.codigo_invitado; // Devolver el código generado
    } catch (error) {
      console.error("Error generando código de invitado:", error);
      setError("No se pudo generar el código. Intenta nuevamente.");
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
      await Promise.allSettled([
        fetchProducts(), 
        fetchDevices(token), 
        fetchPlanes() // Llama a la función para obtener los planes
      ]);
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
              lastUpdate={new Date(device.ult_actualizacion?._seconds * 1000).toLocaleString() || 'Sin actualizaciones'}
              updateRate={`${device.refresco} ${device.refresco === 1 ? 'minuto' : 'minutos'}`}
              battery={`${device.bateria?.toFixed(0) || 0}%`}
              imageSrc={device.imagen}
              isOwnDevice={true}
              onGenerateCodigo={handleGenerateCodigo} // Para generar el código cuando el usuario haga clic
              onEditName={(newName) => handleEditName(device.id, newName)}
              onOpenSettingsModal={handleOpenSettingsModal} // Configuración modal
              onOpenGenerateCodeModal={handleOpenGenerateCodeModal} // Asegúrate de pasar esta función
              deviceId={device.id}
              onViewLocation={handleViewLocation} // Pasar función aquí
              

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
                onClose={() => setGenerateCodeDevice(null)} // Cierra el modal
              />
            )}
        {/* Modal de configuración */}
        {settingsDevice && (
          <SettingsModal
            onClose={handleCloseSettingsModal} // Cierra el modal
            onEditName={(newName) => handleEditName(settingsDevice.id, newName)} // Editar apodo
            onGenerateCode={() => handleGenerateCodigo(settingsDevice.id)} // Generar código
            onManageInvites={(userId) => handleRemoveInvite(settingsDevice.id, userId)} //  handleRemoveInvite
            onChangePlan={(newPlanId) => handleChangePlan(settingsDevice.id, newPlanId)} // Cambiar plan
            onUnsubscribe={() => console.log('Darse de baja')} // Placeholder: Darse de baja
            planes={planes} // Lista de planes
            codigoInvitado={settingsDevice.codigoInvitado} // Código de invitado
            apodoActual={settingsDevice.apodo} // Apodo actual del dispositivo
            usuariosInvitados={settingsDevice.usuariosInvitados} // Usuarios invitados
          />
        )}


        {invitedDevices.length > 0 && (
          <>
            <h1 className={styles.homeTitle}>Dispositivos Invitados</h1>
            <div className={styles.homeCards}>
              {invitedDevices.map((device) => (
                <DispositivoCard
                  key={device.id}
                  deviceId={device.id}
                  title={device.apodo || 'Sin apodo'}
                  lastUpdate={
                    device.ult_actualizacion
                      ? new Date(device.ult_actualizacion._seconds * 1000).toLocaleString()
                      : 'Sin actualizaciones'
                  }
                  updateRate={`${device.refresco} ${device.refresco === 1 ? 'minuto' : 'minutos'}`}
                  battery={`${device.bateria?.toFixed(0) || 0}%`}
                  imageSrc={device.imagen}
                  isOwnDevice={false}
                  onViewLocation={handleViewLocation} // Pasar función aquí
              
                  />
              ))}
            </div>
          </>
        )}

        {showToast && <Toast message={toastMessage} />}
      </div>
      {ownDevices.length > 0 && (
        <div className={styles.extraButtons}>
          <button onClick={handleViewAllLocations} className={styles.panelBtn}>
            Visualizar ubicación de todos los dispositivos
          </button>
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
