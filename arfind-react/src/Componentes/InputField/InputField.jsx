import React from 'react';
import editIcon from '/images/edit.png'; // Importa el icono de edición

const InputField = ({ label, name, value, onChange, isEditable, onEdit, readOnly, hideEditIcon }) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      <div className="input-wrapper">
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          disabled={readOnly || !isEditable} // Campo desactivado si es de solo lectura o no editable
          required
          readOnly={readOnly} // Para los navegadores que distinguen entre `disabled` y `readOnly`
        />
        {!hideEditIcon && !readOnly && ( // Mostrar el botón si `hideEditIcon` no es true y el campo no es de solo lectura
          <button type="button" className="edit-button" onClick={onEdit}>
            <img src={editIcon} alt="Edit" />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
