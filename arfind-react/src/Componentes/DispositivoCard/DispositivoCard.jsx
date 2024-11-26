import React, { useState } from 'react';
import './DispositivoCard.css';
import editIcon from '/images/edit.png';
import settingsIcon from '/images/settings.png';
import addIcon from '/images/plus.png';
import copyIcon from '/images/copy.png';

const DispositivoCard = ({
  title,
  lastUpdate,
  updateRate,
  battery,
  imageSrc,
  isOwnDevice,
  codigoInvitado,
  onGenerateCodigo,
  onEditName,
  invitedUsers = [],
  onRemoveInvitedUser,
  onChangePlan,
  onUnsubscribe,
  deviceId,
}) => {
  const [activeModal, setActiveModal] = useState(null); // Modales de acceso rápido y configuración
  const [selectedOption, setSelectedOption] = useState(null); // Opciones dentro del modal de configuración
  const [showToast, setShowToast] = useState(false);
  const [newName, setNewName] = useState(title);
  const [isEditingName, setIsEditingName] = useState(false); // Controla si se está editando el nombre directamente en la tarjeta
  const [selectedPlan, setSelectedPlan] = useState('basic');

  const handleCopyToClipboard = () => {
    if (codigoInvitado) {
      navigator.clipboard.writeText(codigoInvitado).then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      });
    }
  };

  const handleSaveEdit = () => {
    if (newName.trim() !== '') {
      onEditName(newName);
      setIsEditingName(false);
    }
  };

  const handleGenerateCodigo = () => {
    if (onGenerateCodigo) {
      onGenerateCodigo(deviceId);
    }
  };

  const handleChangePlan = () => {
    if (onChangePlan) {
      onChangePlan(selectedPlan);
      setSelectedOption(null);
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
      case 'generateCode':
        return (
          <div className="right-panel">
            <h2>Código de Invitado</h2>
            <div className="code-container">
              <span className="generated-code">
                {codigoInvitado || 'No se ha generado un código aún.'}
              </span>
              {codigoInvitado && (
                <img
                  src={copyIcon}
                  alt="Copiar"
                  className="copy-icon"
                  onClick={handleCopyToClipboard}
                />
              )}
            </div>
            <button className="generate-button" onClick={handleGenerateCodigo}>
              Generar Código
            </button>
          </div>
        );
      case 'changePlan':
        return (
          <div className="right-panel">
            <h2>Cambiar Plan</h2>
            <select onChange={(e) => setSelectedPlan(e.target.value)} value={selectedPlan} className="select">
              <option value="basic">Básico - $10/mes</option>
              <option value="pro">Pro - $20/mes</option>
              <option value="premium">Premium - $30/mes</option>
            </select>
            <button className="save-button" onClick={handleChangePlan}>
              Confirmar
            </button>
          </div>
        );
      case 'manageInvitedUsers':
        return (
          <div className="right-panel">
            <h2>Gestionar Invitados</h2>
            <ul>
              {invitedUsers.map((user) => (
                <li key={user}>
                  {user}
                  <button className="remove-invited-btn" onClick={() => onRemoveInvitedUser(user)}>
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'unsubscribe':
        return (
          <div className="right-panel">
            <h2>Darse de Baja</h2>
            <p>¿Estás seguro de que deseas darte de baja? Esta acción no se puede deshacer.</p>
            <button className="delete-button" onClick={onUnsubscribe}>
              Confirmar Baja
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
              <button className="cancel-button" onClick={() => setIsEditingName(false)}>
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
              onClick={() => setActiveModal('generateCode')}
              title="Generar Código de Invitado"
            />
            <img
              src={settingsIcon}
              alt="Configuración"
              className="settings-icon"
              onClick={() => setActiveModal('settings')}
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

      {/* Modales de acceso rápido */}
      {activeModal === 'generateCode' && (
        <div className="modal">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setActiveModal(null)}>
              ×
            </button>
            <h2>Código de Invitado</h2>
            <div className="code-container">
              <span className="generated-code">
                {codigoInvitado || 'No se ha generado un código aún.'}
              </span>
              {codigoInvitado && (
                <img
                  src={copyIcon}
                  alt="Copiar"
                  className="copy-icon"
                  onClick={handleCopyToClipboard}
                />
              )}
            </div>
            <button className="generate-button" onClick={handleGenerateCodigo}>
              Generar Código
            </button>
          </div>
        </div>
      )}

      {/* Modal de configuración */}
      {activeModal === 'settings' && (
        <div className="modal">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setActiveModal(null)}>
              ×
            </button>
            <div className="modal-body">
              <div className="left-panel">
                <h3>Configuración del dispositivo</h3>
                <button onClick={() => setSelectedOption('editNickname')}>Editar Apodo</button>
                <button onClick={() => setSelectedOption('generateCode')}>Generar Código</button>
                <h3>Invitados</h3>
                <button onClick={() => setSelectedOption('manageInvitedUsers')}>Gestión de Invitados</button>
                <h3>Plan de uso</h3>
                <button onClick={() => setSelectedOption('changePlan')}>Cambiar Plan</button>
                <button onClick={() => setSelectedOption('unsubscribe')} className="danger-button">
                  Darse de Baja
                </button>
              </div>
              <div className="right-panel">{renderRightContent()}</div>
            </div>
          </div>
        </div>
      )}

      {showToast && <div className="toast">¡Código copiado al portapapeles!</div>}
    </div>
  );
};

export default DispositivoCard;
