import React from 'react';
import './DispositivoCard.css'; 
import editIcon from '/images/edit.png'; 
import settingsIcon from '/images/settings.png'; 

// Recibe las props en el componente
const DispositivoCard = ({ title, lastUpdate, updateRate, battery, imageSrc }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-container">
          <h2 className="card-title">{title}</h2>
          <img src={editIcon} alt="Editar" className="edit-icon" />
        </div>
        <img src={settingsIcon} alt="Configuración" className="settings-icon" />
      </div>
      <div className="card-content"> 
        <img 
          src={imageSrc} 
          alt="Imagen de la tarjeta" 
          className="card-image" 
        />
        <div className="card-text">
          <p>Última actualización: {lastUpdate}</p>
          <p>Tasa de actualización: {updateRate}</p>
          <p>Batería: {battery}</p>
        </div>
      </div>
      <button className="view-location-btn">Ver Ubicación</button>
    </div>
  );
};

export default DispositivoCard;
