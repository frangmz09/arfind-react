import React from 'react';
import './AddInvitedDeviceModal.module.css';
import '../Modal.css';

const AddInvitedDeviceModal = ({ codigoInvitado, setCodigoInvitado, onClose, onSubmit }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2 className="add-dispo-inv-title modal-title" >Agregar Dispositivo Invitado</h2>
        <input
          type="text"
          value={codigoInvitado}
          onChange={(e) => setCodigoInvitado(e.target.value)}
          placeholder="Código de Invitado"
          className="input-invite"
        />
        <button
          className="add-invite-btn-modal"
          onClick={onSubmit}
          disabled={!codigoInvitado.trim()}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default AddInvitedDeviceModal;
