// InputField.jsx
import React from 'react';
import editIcon from '/images/edit.png'; // Importa el icono de edición

const InputField = ({ label, name, value, onChange, isEditable, onEdit }) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      <div className="input-wrapper">
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          disabled={!isEditable}
          required
        />
        <button type="button" className="edit-button" onClick={onEdit}>
          <img src={editIcon} alt="Edit" />
        </button>
      </div>
    </div>
  );
};

export default InputField;
