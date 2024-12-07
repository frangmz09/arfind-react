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
  const defaultCenter =
    locations.length > 0
      ? { lat: locations[0].position.lat, lng: locations[0].position.lng }
      : { lat: -34.6037, lng: -58.3816 };

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY} libraries={['marker']}>
      <Map
        mapId={'3ee229e6cc214695'}
        defaultZoom={15}
        defaultCenter={defaultCenter}
        gestureHandling="greedy"
        disableDefaultUI
      >
        {locations.map((location) => (
          <AdvancedMarker
            key={location.id}
            position={location.position}
            title={`Dispositivo: ${location.apodo}`}
          >
                     <div
                    style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', // Centra horizontalmente
                    justifyContent: 'center', // Centra verticalmente
                    position: 'relative', // Necesario para posicionar el ::after
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
                    bottom: '-20px', // Ajusta la posición del texto
                    pointerEvents: 'none', // Elimina la interacción del ratón
                    }}
                    >
                    <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 'bolder',
                      color: '#0486FF',
                      whiteSpace: 'nowrap', // Evita que el texto haga wrap
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
