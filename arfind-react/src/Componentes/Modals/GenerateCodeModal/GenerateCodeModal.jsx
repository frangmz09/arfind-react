import React from 'react';
import styles from './GenerateCodeModal.module.css'; // Archivo de estilos actualizado

const GenerateCodeModal = ({ codigoInvitado, onGenerateCodigo, onCopyToClipboard, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2 className={styles.modalTitle}>Código de Invitado</h2>
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
              onClick={onCopyToClipboard}
            />
          )}
        </div>
        <button className={styles.generateButton} onClick={onGenerateCodigo}>
          Generar Código
        </button>
      </div>
    </div>
  );
};


export default GenerateCodeModal;
