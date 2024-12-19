import React from 'react';
import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const markerImages = {
  persona: '/images/markers/persona.png',
  vehiculo: '/images/markers/vehiculo.png',
  mascota: '/images/markers/mascota.png',
  default: '/images/markers/default.png',
};

const mapTipoProducto = (tipoProductoId) => {
  const tipoProductoMap = {
    'CAVaDe6BSc5fDGFdkWIW': 'mascota',
    'ciOVrFYTFyxC7nkAgIXZ': 'vehiculo',
    'mkiv1kaC8xWWGhNYNtSl': 'persona',
  };

  return tipoProductoMap[tipoProductoId] || 'default';
};

const Mapa = ({ locations }) => {
  // Filtrar ubicaciones válidas
  const validLocations = locations.filter(
    (location) =>
      location.position &&
      typeof location.position.lat === 'number' &&
      typeof location.position.lng === 'number' &&
      !isNaN(location.position.lat) &&
      !isNaN(location.position.lng)
  );

  // Definir el centro predeterminado basado en ubicaciones válidas
  const defaultCenter =
    validLocations.length > 0
      ? { lat: validLocations[0].position.lat, lng: validLocations[0].position.lng }
      : { lat: -34.6037, lng: -58.3816 }; // Latitud y longitud predeterminadas (Buenos Aires)

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY} libraries={['marker']}>
      <Map
        mapId={'3ee229e6cc214695'}
        defaultZoom={15}
        defaultCenter={defaultCenter}
        gestureHandling="greedy"
        disableDefaultUI
      >
        {validLocations.map((location) => (
          <AdvancedMarker
            key={location.id}
            position={location.position}
            title={`Dispositivo: ${location.apodo}`}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '68px',
                  backgroundImage: `url(${markerImages[mapTipoProducto(location.tipoProducto)]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  pointerEvents: 'none',
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 'bolder',
                    color: '#0486FF',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {location.apodo}
                </span>
              </div>
            </div>
          </AdvancedMarker>
        ))}
      </Map>
    </APIProvider>
  );
};

export default Mapa;
