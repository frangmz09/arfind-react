// AccountSettingsPage.jsx
import React, { useState } from 'react';
import AccountForm from './AccountForm/AccountForm';
import './AccountSettingsPage.css';

const AccountSettingsPage = () => {
  const [user, setUser] = useState({
    apellido: "Stansiola",
    nombre: "Tiago",
    correo: "tiagowalterstansiola@gmail.com",
    telefono: "1123871066",
    fecha_actualizacion: "31 de agosto de 2024, 8:45:38 p.m. UTC-3",
    fecha_creacion: "31 de agosto de 2024, 8:45:23 p.m. UTC-3",
    id: "1CULSJGLrda8nYSHd8T7"
  });

  const handleSave = (updatedUser) => {
    setUser({
      ...user,
      ...updatedUser,
      fecha_actualizacion: new Date().toLocaleString() // Actualiza la fecha de modificación
    });
    console.log('Usuario actualizado:', updatedUser);
  };

  return (
    <div className="account-settings">
      <h1>Configuración de la Cuenta</h1>
      <AccountForm user={user} onSave={handleSave} />
    </div>
  );
};

export default AccountSettingsPage;
