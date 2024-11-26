import React from 'react';
import styles from './SettingsModal.module.css';
import styles from '../Modal.css';

const SettingsModal = ({ onClose, onEditName, invitedUsers, onRemoveInvitedUser, onChangePlan, onUnsubscribe }) => (
  <div className={styles.modal}>
    <div className={styles.modalContent}>
      <button className={styles.modalClose} onClick={onClose}>
        ×
      </button>
      <div className={styles.modalBody}>
        {/* Agrega la lógica específica de configuración */}
      </div>
    </div>
  </div>
);

export default SettingsModal;
