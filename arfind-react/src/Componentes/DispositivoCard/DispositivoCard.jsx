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
  onEditName, // Callback para manejar la edición del nombre
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false); // Estado para controlar el toast
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar si se está editando
  const [newName, setNewName] = useState(title); // Nuevo nombre del dispositivo

  const handleCopyToClipboard = () => {
    if (codigoInvitado) {
      navigator.clipboard.writeText(codigoInvitado).then(
        () => {
          // Mostrar el toast por unos segundos
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000); // Ocultar el toast después de 2 segundos
        },
        (err) => console.error('Error al copiar al portapapeles:', err)
      );
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Alternar entre edición y vista normal
    setNewName(title); // Restablecer el nombre si se cancela la edición
  };

  const handleSaveEdit = () => {
    if (newName.trim() !== '') {
      onEditName(newName); // Llamar al callback con el nuevo nombre
      setIsEditing(false); // Salir del modo de edición
    }
  };

  return (
    <div className={`card ${isOwnDevice ? '' : 'invited-card'}`}>
      <div className="card-header">
        <div className="card-title-container">
          {isEditing ? (
            <div className="edit-input-container">
              <input
                type="text"
                className="edit-input"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button className="save-edit-button" onClick={handleSaveEdit}>
                ✓
              </button>
              <button className="cancel-button" onClick={handleEditToggle}>
                ×
              </button>
            </div>
          ) : (
            <>
              <h2 className="card-title">{title}</h2>
              {isOwnDevice && (
                <img
                  src={editIcon}
                  alt="Editar nombre"
                  className="edit-icon"
                  onClick={handleEditToggle}
                />
              )}
            </>
          )}
        </div>
        {isOwnDevice && (
          <img
            src={addIcon}
            alt="Generar código"
            className="add-icon"
            onClick={() => setIsModalOpen(true)}
          />
        )}
        <img src={settingsIcon} alt="Configuración" className="settings-icon" />
      </div>
      <div className="card-content">
        <img src={imageSrc} alt="Imagen de la tarjeta" className="card-image" />
        <div className="card-text">
          <p>Última actualización: {lastUpdate}</p>
          <p>Tasa de actualización: {updateRate}</p>
          <p>Batería: {battery}</p>
        </div>
      </div>
      <button className="view-location-btn">Ver Ubicación</button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <div className="modal-header">Código de Invitado</div>
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
            <button className="generate-button" onClick={onGenerateCodigo}>
              GENERAR CÓDIGO
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="toast">¡Código copiado al portapapeles!</div>
      )}
    </div>
  );
};

export default DispositivoCard;
