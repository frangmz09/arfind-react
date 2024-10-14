// AccountForm.jsx
import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import editIcon from '/images/edit.png'; // Importa el icono de edición

const AccountForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: user.nombre,
    apellido: user.apellido,
    correo: user.correo,
    telefono: user.telefono
  });

  const [isEditable, setIsEditable] = useState({
    nombre: false,
    apellido: false,
    correo: false,
    telefono: false
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = (field) => {
    setIsEditable({
      ...isEditable,
      [field]: !isEditable[field] // Activa/desactiva el campo
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="account-form">
      <InputField
        label="Nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        isEditable={isEditable.nombre}
        onEdit={() => handleEdit('nombre')}
      />
      <InputField
        label="Apellido"
        name="apellido"
        value={formData.apellido}
        onChange={handleChange}
        isEditable={isEditable.apellido}
        onEdit={() => handleEdit('apellido')}
      />
      <InputField
        label="Correo"
        name="correo"
        value={formData.correo}
        onChange={handleChange}
        isEditable={isEditable.correo}
        onEdit={() => handleEdit('correo')}
      />
      <InputField
        label="Teléfono"
        name="telefono"
        value={formData.telefono}
        onChange={handleChange}
        isEditable={isEditable.telefono}
        onEdit={() => handleEdit('telefono')}
      />
      <button type="submit" className="save-button">
        Guardar cambios
      </button>
    </form>
  );
};

export default AccountForm;
