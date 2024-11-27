import React, { useState } from 'react';
import styles from './DispositivoCard.module.css';
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
  onGenerateCodigo,
  onEditName,
  onOpenSettingsModal,
  onOpenGenerateCodeModal, // Aquí se pasa
  deviceId,
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
              <input
                type="text"
                className={styles.editInput}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                autoFocus
              />
              <button className={styles.saveEditButton} onClick={handleSaveEdit}>
                Guardar
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setIsEditingName(false)}
              >
                Cancelar
              </button>
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
        {isOwnDevice && (
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
              onClick={() => onOpenSettingsModal(deviceId)} // Llama a la función que abre el modal
              title="Configuración"
            />
          </>
        )}
      </div>
      <div className={styles.cardContent}>
        <img src={imageSrc} alt="Imagen de la tarjeta" className={styles.cardImage} />
        <div className={styles.cardText}>
          <p>Última actualización: {lastUpdate}</p>
          <p>Tasa de actualización: {updateRate}</p>
          <p>Batería: {battery}</p>
        </div>
      </div>
    </div>
  );
};

export default DispositivoCard;
