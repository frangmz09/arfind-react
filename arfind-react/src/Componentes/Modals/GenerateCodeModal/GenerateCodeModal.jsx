import React from 'react';
import styles from './GenerateCodeModal.module.css'; // Estilos específicos
import '../Modal.css'; // Estilos globales

const GenerateCodeModal = ({ codigoInvitado, onGenerateCodigo, onCopyToClipboard, onClose }) => (
  <div className="modal">
    <div className={styles.modalContent}>
      <button className={styles.modalClose} onClick={onClose}>
        ×
      </button>
      <h2 className="modal-title">Código de Invitado</h2>
      <div className={styles.codeContainer}>
        <span className={styles.generatedCode}>
          {codigoInvitado || 'No se ha generado un código aún.'}
        </span>
        {codigoInvitado && (
          <button className={styles.copyButton} onClick={onCopyToClipboard}>
            Copiar
          </button>
        )}
      </div>
      <button className={styles.generateButton} onClick={onGenerateCodigo}>
        Generar Código
      </button>
    </div>
  </div>
);

export default GenerateCodeModal;
