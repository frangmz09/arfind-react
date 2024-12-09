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
  cambiarPlan,
  darseDeBaja
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
  const handleUnsubscribeDevice = async (deviceId) => {
    try {
      const token = localStorage.getItem('userToken'); // Obtén el token de autenticación
      await darseDeBaja(deviceId, token); // Llama al servicio con el ID del dispositivo
      
      // Elimina el dispositivo del estado de dispositivos propios
      setOwnDevices((prevDevices) => prevDevices.filter((device) => device.id !== deviceId));
  
      setToastMessage('¡Te has dado de baja del dispositivo con éxito!');
      setShowToast(true);
  
      // Fuerza la recarga de dispositivos desde la API
      const updatedDevices = await getDispositivosByUsuario(token);
      setOwnDevices(updatedDevices);
    } catch (error) {
      console.error('Error al darse de baja del dispositivo:', error);
      setToastMessage(error.message || 'Error al darse de baja. Intenta nuevamente.');
      setShowToast(true);
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
      showToast(error.message || 'Error al eliminar invitado, intente nuevamente.', 'error');
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
      showToast(err.message || 'Error al eliminar invitado, intente nuevamente.', 'error');

    }
  };

  // Nueva función para obtener los planes desde la API
  const fetchPlanes = async () => {
    try {
      const planesResponse = await getPlanes(); // Llama a la API
      setPlanes(planesResponse); // Guarda los planes en el estado
    } catch (err) {
      console.error('Error obteniendo los planes:', err);
      showToast(err.message || 'Error obteniendo los planes.', 'error');

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
      showToast(err.message || 'Error obteniendo los productos.', 'error');
    }
  };


  const fetchDevices = async (token) => {
    try {
      // Hacer las solicitudes de dispositivos en paralelo
      const [ownDevicesResponse, invitedDevicesResponse] = await Promise.all([
        getDispositivosByUsuario(token).catch(() => []), // Manejo de error: si falla, retorna []
        getDispositivosInvitados(token).catch(() => []), // Manejo de error: si falla, retorna []
      ]);
  
      // Asegurarnos de que las respuestas sean listas (arrays)
      const ownDevicesData = Array.isArray(ownDevicesResponse) ? ownDevicesResponse : [];
      const invitedDevicesData = Array.isArray(invitedDevicesResponse) ? invitedDevicesResponse : [];
  
      // Actualizar estados
      setOwnDevices(ownDevicesData);
      setInvitedDevices(invitedDevicesData);
  
      // Actualizar ubicaciones
      const ownDeviceLocations = ownDevicesData.map((device) => ({
        id: device.id,
        position: device.ubicacion
          ? {
              lat: device.ubicacion._latitude,
              lng: device.ubicacion._longitude,
            }
          : null, // Asegúrate de asignar null si no hay ubicación
        tipoProducto: device.tipo_producto,
        apodo: device.apodo || 'Sin apodo',
        imageSrc: device.imagen,
      }));
      
      
      const invitedDeviceLocations = invitedDevicesData.map((device) => ({
        id: device.id,
        position: device.ubicacion
          ? {
              lat: device.ubicacion._latitude,
              lng: device.ubicacion._longitude,
            }
          : null,
        tipoProducto: device.tipo_producto,
        apodo: device.apodo || 'Sin apodo',
        imageSrc: device.imagen,
      }));
      
      
      
  
      const allLocations = [...ownDeviceLocations, ...invitedDeviceLocations];
      setLocations(allLocations); // Actualizar el estado con las ubicaciones
  
      console.log("Dispositivos cargados correctamente:", allLocations);
    } catch (err) {
      console.error("Error obteniendo los dispositivos:", err);
      showToast(err.message || 'Error al obtener dispositivos.', 'error');
      setOwnDevices([]);
      setInvitedDevices([]);
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
  
      // Actualizar el código en el modal
      setGenerateCodeDevice((prev) =>
        prev && prev.id === deviceId
          ? { ...prev, codigo_invitado: response.codigo_invitado }
          : prev
      );
  
      setToastMessage("¡Código generado con éxito!");
      setShowToast(true);
  
      return response.codigo_invitado; // Devolver el código generado
    } catch (error) {
      console.error("Error generando código de invitado:", error);
      showToast(error.message || "No se pudo generar el código de invitado. Intenta nuevamente.", "error");
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
      showToast(error.message || 'Error al actualizar el nombre.', 'error');

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
      showToast(err.message || 'No se pudo agregar el dispositivo. Intenta nuevamente.', 'error');
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
      <div className={styles.pasarelaHome}>
        <h2 className={styles.homeTitle}>Realiza el pedido de tu próximo dispositivo</h2>
        {products.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          <PasarelaProductos products={products} height="150px" />
        )}
      </div>
        {error && <p className={styles.errorMessage}>{error}</p>}

        <h1 className={styles.homeTitle}>Tus Dispositivos Propios</h1>
        <div className={styles.homeCards}>
        {ownDevices
        .slice() // Crea una copia para no modificar el estado original
        .sort((a, b) => {
          // Si `plan_id` está presente, lo consideramos primero
          if (a.plan_id && !b.plan_id) return -1;
          if (!a.plan_id && b.plan_id) return 1;
          return 0; // Mantén el orden relativo si ambos tienen o no tienen `plan_id`
        })
        .map((device) => {
          const deviceLocation = locations.find((loc) => loc.id === device.id);
          const hasPlan = !!device.plan_id; // Verifica si tiene un plan asociado
          const onViewLocation =
            deviceLocation && deviceLocation.position
              ? () => handleViewLocation(device.id)
              : undefined;

          console.log({
            device: device.apodo,
            location: deviceLocation,
            hasPlan,
            onViewLocation,
          }); // Depuración

          return (
            <DispositivoCard
              key={device.id}
              title={device.apodo || 'Sin apodo'}
              lastUpdate={
                device.ult_actualizacion
                  ? new Date(device.ult_actualizacion._seconds * 1000).toLocaleString()
                  : 'Sin actualizaciones'
              }
              updateRate={`${device.refresco} ${device.refresco === 1 ? 'minuto' : 'minutos'}`}
              battery={`${device.bateria?.toFixed(0) || 0}%`}
              imageSrc={device.imagen}
              isOwnDevice={true}
              onGenerateCodigo={handleGenerateCodigo}
              onEditName={(newName) => handleEditName(device.id, newName)}
              onOpenSettingsModal={handleOpenSettingsModal}
              onOpenGenerateCodeModal={handleOpenGenerateCodeModal}
              deviceId={device.id}
              onViewLocation={
                deviceLocation && deviceLocation.position !== null && deviceLocation.position !== undefined
                  ? () => handleViewLocation(device.id)
                  : null // Asegúrate de pasar null explícitamente si no tiene ubicación
              }
              
              hasPlan={hasPlan} // Indica si tiene plan
            />
          );
        })}




       
      </div>
      {ownDevices.length > 0 && (
        <div className={styles.extraButtons}>
          <button onClick={handleViewAllLocations} className={styles.panelBtn}>
            Visualizar ubicación de todos los dispositivos
          </button>
        </div>
      )}
       

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
            onUnsubscribe={() => handleUnsubscribeDevice(settingsDevice.id)} 
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
            {invitedDevices.length > 0 ? (
              invitedDevices.map((device) => {
                const deviceLocation = locations.find((loc) => loc.id === device.id);
                return (
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
                    onViewLocation={deviceLocation?.position ? () => handleViewLocation(device.id) : null} // Solo pasa la función si hay ubicación
                  />
                );
              })
            ) : (
              <p>No tienes dispositivos invitados registrados.</p>
            )}
            </div>
          </>
        )}

        {showToast && <Toast message={toastMessage} />}
      </div>
       <button onClick={() => setIsModalOpen(true)} className={styles.panelBtn}>
          Agregar dispositivo Invitado
        </button>
      <div className={styles.homeButtons}>
        <BtnAux image="/images/settings.png" altText="Configuración" link="/account-settings" />
        <BtnAux image="/images/support.png" altText="Soporte" link="/contact" />
      </div>
    </div>
  );
};

export default Home;
