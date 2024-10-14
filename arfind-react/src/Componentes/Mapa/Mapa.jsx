import React from 'react';
import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  Marker,
  Pin
} from '@vis.gl/react-google-maps';
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const markers = [
  {
    position: { lat: -34.6037, lng: -58.3816 }, // Ubicación en Buenos Aires
    pinOptions: {
      background: '#0486FF',
      glyphColor: '#FFF',
      borderColor: '#FFF'
    }
  },
  {
    position: { lat: -34.6070, lng: -58.3817 }, // Otra ubicación en Buenos Aires
    pinOptions: {
      background: '#0486FF',
      glyphColor: '#FFF',
      borderColor: '#FFF'
    }
  },
];

const mapProps = {
  zoom: 12,
  center: { lat: -34.6037, lng: -58.3816 }, // Centro en Buenos Aires
  mapId: '3ee229e6cc214695', // Reemplaza con tu Map ID si es necesario
  options: {
    gestureHandling: 'greedy' // Permite el arrastre y el zoom
  }
};

const Mapa = () => (
  <APIProvider apiKey={GOOGLE_MAPS_API_KEY} libraries={['marker']}>
      <Map
        mapId={'3ee229e6cc214695'}
        defaultZoom={15}
        defaultCenter={{ lat: -34.6037, lng: -58.3816 }}
        gestureHandling={'greedy'}
        disableDefaultUI>

        {/* advanced marker with html-content */}
        <AdvancedMarker
          position={{lat: -34.6037, lng: -58.3800}}
          title={'AdvancedMarker with custom html content.'}>
          <div
          style={{
            width: '50px',
            height: '68px', 
            backgroundImage: 'url(/images/markers/persona.png)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat' 
          }}
        ></div>
        </AdvancedMarker>
        <AdvancedMarker
          position={{lat: -34.6037, lng: -58.3830}}
          title={'AdvancedMarker with custom html content.'}>
          <div
          style={{
            width: '50px',
            height: '68px', 
            backgroundImage: 'url(/images/markers/automovil.png)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat' 
          }}
        ></div>
        </AdvancedMarker>
        <AdvancedMarker
          position={{lat: -34.6040, lng: -58.3816}}
          title={'AdvancedMarker with custom html content.'}>
          <div
          style={{
            width: '50px',
            height: '68px', 
            backgroundImage: 'url(/images/markers/default.png)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat' 
          }}
        ></div>
        </AdvancedMarker>
        <AdvancedMarker
          position={{lat: -34.6070, lng: -58.3816}}
          title={'AdvancedMarker with custom html content.'}>
          <div
          style={{
            width: '50px',
            height: '68px', 
            backgroundImage: 'url(/images/markers/mascota.png)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat' 
          }}
        ></div>
        </AdvancedMarker>

      </Map>
    </APIProvider>
);

export default Mapa;
