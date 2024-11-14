import React, { useState } from 'react';
import './DispositivoCard.css'; 
import editIcon from '/images/edit.png'; 
import settingsIcon from '/images/settings.png'; 

const DispositivoCard = ({ title, lastUpdate, updateRate, battery, imageSrc, onSaveApodo }) => {
  // Estado para manejar si se está en modo de edición y para el nuevo apodo
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  // Cambia a modo de edición
  const handleEditClick = () => setIsEditing(true);

  // Guarda el nuevo apodo y lo envía al backend
  const handleSaveClick = async () => {
    setIsEditing(false);
    if (newTitle !== title) {
      onSaveApodo(newTitle); // Llama a la función que envía el nuevo apodo al backend
    }
  };

  // Cancela la edición y restaura el título anterior
  const handleCancelClick = () => {
    setNewTitle(title); // Restaura el título original
    setIsEditing(false);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-container">
          {isEditing ? (
            <input 
              type="text" 
              value={newTitle} 
              onChange={(e) => setNewTitle(e.target.value)} 
              className="edit-input" // Estilo para el input de edición
            />
          ) : (
            <h2 className="card-title">{title}</h2>
          )}
          {isEditing ? (
            <>
              <button onClick={handleSaveClick} className="save-edit-button">Guardar</button>
              <button onClick={handleCancelClick} className="cancel-button">Cancelar</button>
            </>
          ) : (
            <img src={editIcon} alt="Editar" className="edit-icon" onClick={handleEditClick} />
          )}
        </div>
        {/* Solo muestra el ícono de configuración si no estamos en modo de edición */}
        {!isEditing && <img src={settingsIcon} alt="Configuración" className="settings-icon" />}
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
