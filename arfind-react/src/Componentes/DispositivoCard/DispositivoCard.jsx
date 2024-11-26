import React, { useState } from 'react';
import './DispositivoCard.css';
import editIcon from '/images/edit.png';
import settingsIcon from '/images/settings.png';
import addIcon from '/images/plus.png';

const DispositivoCard = ({
  title,
  lastUpdate,
  updateRate,
  battery,
  imageSrc,
  isOwnDevice,
  codigoInvitado,
  onGenerateCodigo, // Recibe la función desde Home
  onEditName,
  invitedUsers = [],
  onRemoveInvitedUser,
  onChangePlan,
  onUnsubscribe,
  deviceId,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [newName, setNewName] = useState(title);
  const [isEditingName, setIsEditingName] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('basic');

  const handleSaveEdit = () => {
    if (newName.trim() !== '') {
      onEditName(newName);
      setIsEditingName(false);
    }
  };
  
  const renderRightContent = () => {
    switch (selectedOption) {
      case 'editNickname':
        return (
          <div className="right-panel">
            <h2>Editar Apodo</h2>
            <input
              type="text"
              className="input"
              placeholder="Nuevo apodo"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button className="save-button" onClick={handleSaveEdit}>
              Guardar
            </button>
          </div>
        );
      case 'changePlan':
        return (
          <div className="right-panel">
            <h2>Cambiar Plan</h2>
            <select
              onChange={(e) => setSelectedPlan(e.target.value)}
              value={selectedPlan}
              className="select"
            >
              <option value="basic">Básico - $10/mes</option>
              <option value="pro">Pro - $20/mes</option>
              <option value="premium">Premium - $30/mes</option>
            </select>
            <button className="save-button" onClick={onChangePlan}>
              Confirmar
            </button>
          </div>
        );
      default:
        return <div className="right-panel">Selecciona una opción para continuar.</div>;
    }
  };

  return (
    <div className={`card ${isOwnDevice ? '' : 'invited-card'}`}>
      <div className="card-header">
        <div className="card-title-container">
          {isEditingName ? (
            <>
              <input
                type="text"
                className="edit-input"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button className="save-edit-button" onClick={handleSaveEdit}>
                Guardar
              </button>
              <button
                className="cancel-button"
                onClick={() => setIsEditingName(false)}
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <h2 className="card-title">{title}</h2>
              {isOwnDevice && (
                <img
                  src={editIcon}
                  alt="Editar nombre"
                  className="edit-icon"
                  onClick={() => setIsEditingName(true)}
                  title="Editar Apodo"
                />
              )}
            </>
          )}
        </div>
        {isOwnDevice && (
          <>
            <img
              src={addIcon}
              alt="Generar código"
              className="add-icon"
              onClick={() => onGenerateCodigo(deviceId)} // Llama a la función pasada desde Home
              title="Generar Código de Invitado"
            />
            <img
              src={settingsIcon}
              alt="Configuración"
              className="settings-icon"
              onClick={() => setSelectedOption('settings')}
              title="Configuración"
            />
          </>
        )}
      </div>
      <div className="card-content">
        <img src={imageSrc} alt="Imagen de la tarjeta" className="card-image" />
        <div className="card-text">
          <p>Última actualización: {lastUpdate}</p>
          <p>Tasa de actualización: {updateRate}</p>
          <p>Batería: {battery}</p>
        </div>
      </div>
    </div>
  );
};

export default DispositivoCard;
