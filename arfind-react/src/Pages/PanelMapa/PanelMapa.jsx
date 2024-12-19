import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PanelMapa.css';
import Logo from '../../Componentes/Logo/Logo';
import BtnAux from '../../Componentes/BtnAux/BtnAux';
import Mapa from '../../Pages/Home/Mapa/Mapa';
import { getDispositivosByUsuario, getDispositivosInvitados } from '../../services/dipositivosService';

const PanelMapa = () => {
  const { state } = useLocation();
  const [locations, setLocations] = useState(state?.locations || []);
  const [intervalDuration, setIntervalDuration] = useState(60000); // Duración predeterminada (60s)

  const isSingleDeviceView = locations.length === 1; // Determina si es un solo dispositivo

  useEffect(() => {
    const token = localStorage.getItem('userToken');

    const fetchUpdatedLocations = async () => {
      try {
        if (isSingleDeviceView) {
          // Si es un solo dispositivo, solo actualizamos ese dispositivo
          const singleDeviceId = locations[0].id;

          // Buscar entre dispositivos propios e invitados
          const [ownDevices, invitedDevices] = await Promise.all([
            getDispositivosByUsuario(token).catch(() => []),
            getDispositivosInvitados(token).catch(() => []),
          ]);
          const allDevices = [...ownDevices, ...invitedDevices];
          const updatedDevice = allDevices.find((device) => device.id === singleDeviceId);

          if (updatedDevice) {
            setLocations([
              {
                id: updatedDevice.id,
                position: updatedDevice.ubicacion
                  ? {
                      lat: updatedDevice.ubicacion._latitude,
                      lng: updatedDevice.ubicacion._longitude,
                    }
                  : null,
                tipoProducto: updatedDevice.tipo_producto,
                apodo: updatedDevice.apodo || 'Sin apodo',
              },
            ]);
          }
        } else {
          // Si son múltiples dispositivos, actualizar todos
          const [ownDevices, invitedDevices] = await Promise.all([
            getDispositivosByUsuario(token).catch(() => []),
            getDispositivosInvitados(token).catch(() => []),
          ]);

          const allDevices = [...ownDevices, ...invitedDevices];
          const updatedLocations = allDevices.map((device) => ({
            id: device.id,
            position: device.ubicacion
              ? {
                  lat: device.ubicacion._latitude,
                  lng: device.ubicacion._longitude,
                }
              : null,
            tipoProducto: device.tipo_producto,
            apodo: device.apodo || 'Sin apodo',
          }));

          setLocations(updatedLocations);

          // Calcular el menor valor de "refresco"
          const minRefresco = allDevices.reduce((min, device) => {
            if (device.refresco && device.refresco > 0) {
              return Math.min(min, device.refresco);
            }
            return min;
          }, Infinity);

          // Actualizar el intervalo si es menor al actual
          if (minRefresco !== Infinity) {
            setIntervalDuration(minRefresco * 60000); // Convertir a milisegundos
          }
        }
      } catch (error) {
        console.error('Error actualizando ubicaciones:', error);
      }
    };

    // Llama a fetchUpdatedLocations cada "intervalDuration"
    const intervalId = setInterval(fetchUpdatedLocations, intervalDuration);

    // Llama inmediatamente al cargar el componente
    fetchUpdatedLocations();

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar
  }, [intervalDuration, isSingleDeviceView, locations]); // Escuchar cambios en las dependencias

  return (
    <div className="PanelMapa-page">
      <BtnAux
        className="btnAux"
        image="/images/home.png"
        altText="Volver al inicio"
        link="/"
      />
      <div className="PanelMapa-logo">
        <Logo type="logo" altText="Logo" size="7rem" />
      </div>
      <Mapa locations={locations} /> {/* Pasar ubicaciones al componente Mapa */}
    </div>
  );
};

export default PanelMapa;
