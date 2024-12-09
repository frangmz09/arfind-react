import React, { useState } from 'react';
import styles from './DispositivoCard.module.css';
import editIcon from '/images/edit.png';
import settingsIcon from '/images/settings.png';
import addIcon from '/images/plus.png';

const DispositivoCard = ({
  title,
  imageSrc,
  isOwnDevice,
  onEditName,
  onOpenSettingsModal,
  onOpenGenerateCodeModal,
  onViewLocation, // Función para manejar "Ver ubicación"
  deviceId,
  lastUpdate,
  updateRate,
  battery,
  hasPlan, // Nueva prop para indicar si el dispositivo tiene un plan asociado
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(title);

  const handleSaveEdit = () => {
    if (newName.trim() !== '') {
      onEditName(newName);
      setIsEditingName(false);
    }
  };

  return (
    <div className={`${styles.card} ${isOwnDevice ? '' : styles.invitedCard}`}>
      
      <div className={styles.cardHeader}>
        <div className={styles.cardTitleContainer}>
        {isEditingName ? (
          <>
            <div className={styles.editInputContainer}>
              <input
                type="text"
                className={styles.editInput}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                autoFocus
              />
              <button
                className={styles.saveEditButton}
                onClick={handleSaveEdit}
              >
                Guardar
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setIsEditingName(false)}
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className={styles.cardTitle}>{title}</h2>
            {isOwnDevice && (
              <img
                src={editIcon}
                alt="Editar nombre"
                className={styles.editIcon}
                onClick={() => setIsEditingName(true)}
                title="Editar Apodo"
              />
            )}
          </>
        )}

        </div>
        {isOwnDevice && hasPlan && (
          <>
            <img
              src={addIcon}
              alt="Generar código"
              className={styles.addIcon}
              onClick={() => onOpenGenerateCodeModal(deviceId)}
              title="Generar Código de Invitado"
            />
            <img
              src={settingsIcon}
              alt="Configuración"
              className={styles.settingsIcon}
              onClick={() => onOpenSettingsModal(deviceId)}
              title="Configuración"
            />
          </>
        )}
      </div>
      <div className={styles.cardContent}>
        <img src={imageSrc} alt="Imagen de la tarjeta" className={styles.cardImage} />
        {hasPlan ? (
          <div className={styles.cardText}>
            <p>Última actualización: {lastUpdate}</p>
            <p>Tasa de actualización: {updateRate}</p>
            <p>Batería: {battery}</p>
            
            {typeof onViewLocation === 'function' ? (
            <button
              className={styles.viewLocationButton}
              onClick={() => onViewLocation(deviceId)}
            >
              Ver ubicación
            </button>
          ) : (
            <p className={styles.noLocationMessage}>Sin ubicación disponible</p>
          )}



          </div>
        ) : (
          <div className={styles.noPlanContainer}>
            <p className={styles.noPlanMessage}>Este dispositivo no tiene un plan asociado.</p>
            <button
              className={styles.selectPlanButton}
              onClick={() => onOpenSettingsModal(deviceId, 'changePlan')} // Abrir modal en la pestaña de cambio de plan
            >
              Seleccionar Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DispositivoCard;
