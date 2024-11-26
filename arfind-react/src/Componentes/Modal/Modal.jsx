import React from 'react';
import './Modal.css';

const Modal = ({ title, children, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
