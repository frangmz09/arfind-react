import React from 'react';
import styles from './AddInvitedDeviceModal.module.css';

const AddInvitedDeviceModal = ({ codigoInvitado, setCodigoInvitado, onClose, onSubmit }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2 className={styles.modalTitle}>Agregar Dispositivo Invitado</h2>
        <div className={styles.codeContainer}>
          <input
            type="text"
            value={codigoInvitado}
            onChange={(e) => setCodigoInvitado(e.target.value)}
            placeholder="Código de Invitado"
            className={styles.inputInvite}
          />
        </div>
        <button
          className={styles.addInviteButton}
          onClick={onSubmit}
          disabled={!codigoInvitado.trim()}
        >
          Agregar Dispositivo
        </button>
      </div>
    </div>
  );
};

export default AddInvitedDeviceModal;
