import React, { useState } from 'react';
import styles from './SettingsModal.module.css';

const SettingsModal = ({
  onClose,
  onEditName,
  onManageInvites,
  onChangePlan,
  onUnsubscribe,
  onGenerateCode, // Para generar el código
  codigoInvitado: initialCodigo, // Código de invitado inicial
  apodoActual, // Apodo actual del dispositivo
}) => {
  const [activeTab, setActiveTab] = useState(null); // Controla el contenido del panel derecho
  const [newName, setNewName] = useState(apodoActual || ''); // Controla el apodo editable
  const [codigoInvitado, setCodigoInvitado] = useState(initialCodigo || null); // Controla el código de invitado

  const handleSaveEditName = () => {
    if (newName.trim() !== '') {
      onEditName(newName); // Llama a la función para guardar cambios
    }
  };

  const handleGenerateCodigo = async () => {
    try {
      const nuevoCodigo = await onGenerateCode(); // Llama a la función para generar el código
      setCodigoInvitado(nuevoCodigo); // Actualiza el estado local
    } catch (error) {
      console.error('Error generando código:', error);
    }
  };

  const renderRightContent = () => {
    switch (activeTab) {
      case 'editNickname':
        return (
          <div className={styles.rightPanel}>
            <h2>Editar Apodo</h2>
            <input
              type="text"
              placeholder="Nuevo apodo"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className={styles.input}
            />
            <button onClick={handleSaveEditName} className={styles.saveButton}>
              Guardar
            </button>
          </div>
        );
      case 'generateCode':
        return (
          <div className={styles.rightPanel}>
            <h2>Generar Código de Invitado</h2>
            <div className={styles.codeContainer}>
              <input
                type="text"
                readOnly
                value={codigoInvitado || 'No se ha generado un código aún.'}
                className={styles.generatedCode}
              />
              {codigoInvitado && (
                <img
                  src="/images/copy.png"
                  alt="Copiar"
                  className={styles.copyIcon}
                  onClick={() => navigator.clipboard.writeText(codigoInvitado)}
                />
              )}
            </div>
            <button onClick={handleGenerateCodigo} className={styles.saveButton}>
              Generar Código
            </button>
          </div>
        );
      case 'manageInvites':
        return (
          <div className={styles.rightPanel}>
            <h2>Gestión de Invitados</h2>
            <p>Aquí aparecerán los invitados asociados al dispositivo.</p>
            <button className={styles.saveButton} onClick={onManageInvites}>
              Gestionar Invitados
            </button>
          </div>
        );
      case 'changePlan':
        return (
          <div className={styles.rightPanel}>
            <h2>Cambiar Plan</h2>
            <select className={styles.select}>
              <option value="basic">Básico - $10/mes</option>
              <option value="pro">Pro - $20/mes</option>
              <option value="premium">Premium - $30/mes</option>
            </select>
            <button className={styles.saveButton} onClick={onChangePlan}>
              Confirmar
            </button>
          </div>
        );
      case 'unsubscribe':
        return (
          <div className={styles.rightPanel}>
            <h2>Darse de Baja</h2>
            <p>¿Estás seguro de que deseas darte de baja? Esta acción no se puede deshacer.</p>
            <button className={styles.deleteButton} onClick={onUnsubscribe}>
              Confirmar Baja
            </button>
          </div>
        );
      default:
        return (
          <div className={styles.rightPanel}>
            <p>Selecciona una opción del menú para continuar.</p>
          </div>
        );
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.modalBody}>
          <div className={styles.leftPanel}>
            <h3>Configuración del dispositivo</h3>
            <button onClick={() => setActiveTab('editNickname')}>Editar Apodo</button>
            <button onClick={() => setActiveTab('generateCode')}>Código de Invitado</button>
            <h3>Invitados</h3>
            <button onClick={() => setActiveTab('manageInvites')}>Gestión de Invitados</button>
            <h3>Plan de uso</h3>
            <button onClick={() => setActiveTab('changePlan')}>Cambiar Plan</button>
            <button
              className={`${styles.dangerButton} ${styles.unsubscribeButton}`}
              onClick={() => setActiveTab('unsubscribe')}
            >
              Darse de Baja
            </button>
          </div>
          {renderRightContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
