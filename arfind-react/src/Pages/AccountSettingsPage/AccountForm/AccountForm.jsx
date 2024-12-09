import React, { useState } from 'react';
import InputField from '../../../Componentes/InputField/InputField';
import editIcon from '/images/edit.png'; // Importa el icono de edición
import { updateCliente } from '../../../services/clientesService'; // Importa el servicio actualizado

const AccountForm = ({ user, token, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: user.nombre,
    apellido: user.apellido,
    correo: user.correo, // Correo sigue presente en el estado, pero será de solo lectura
    telefono: user.telefono,
  });

  const [isEditable, setIsEditable] = useState({
    nombre: false,
    apellido: false,
    telefono: false,
  });

  const [loading, setLoading] = useState(false); // Manejo de carga

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (field) => {
    setIsEditable({
      ...isEditable,
      [field]: !isEditable[field], // Activa/desactiva el campo
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Obtén el token directamente desde localStorage
      const token = localStorage.getItem('userToken');
      if (!token) {
        throw new Error('No se encontró el token de autenticación.');
      }

      // Llama al servicio para actualizar la información del cliente
      await updateCliente(token, formData);
      onSave(formData); // Actualiza la información en el estado padre
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      alert('Error al guardar los cambios. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
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
        isEditable={false} // No es editable
        readOnly={true} // Campo de solo lectura
        hideEditIcon={true} // Ocultar el ícono de edición
      />
      <InputField
        label="Teléfono"
        name="telefono"
        value={formData.telefono}
        onChange={handleChange}
        isEditable={isEditable.telefono}
        onEdit={() => handleEdit('telefono')}
      />
      <button type="submit" className="save-button-account-settings" disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar cambios'}
      </button>
    </form>
  );
};

export default AccountForm;
