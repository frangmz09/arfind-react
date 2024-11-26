// AccountSettingsPage.jsx
import React, { useEffect, useState } from 'react';
import AccountForm from './AccountForm/AccountForm';
import './AccountSettingsPage.css';
import { getCliente, updateCliente } from '../../services/clientesService';

const AccountSettingsPage = () => {
  const [user, setUser] = useState(null); // Estado para almacenar la información del usuario
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('userToken'); // Obtén el token del localStorage
        if (!token) {
          throw new Error('No se encontró el token de autenticación.');
        }
        const userData = await getCliente(token); // Llama al servicio para obtener datos del cliente
        setUser(userData);
      } catch (err) {
        console.error('Error al obtener datos del usuario:', err);
        setError('Error al cargar la información del usuario.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async (updatedUser) => {
    try {
      const token = localStorage.getItem('userToken'); // Obtén el token del localStorage
      if (!token) {
        throw new Error('No se encontró el token de autenticación.');
      }
      await updateCliente(token, updatedUser); // Llama al servicio para actualizar los datos del cliente
      setUser({
        ...user,
        ...updatedUser,
        fecha_actualizacion: new Date().toLocaleString(), // Actualiza la fecha de modificación
      });
      setSuccessMessage('Datos actualizados con éxito.');
      setTimeout(() => setSuccessMessage(null), 3000); // Ocultar mensaje después de 3 segundos
    } catch (err) {
      console.error('Error al actualizar los datos del usuario:', err);
      setError('Error al actualizar los datos del usuario. Intenta nuevamente.');
    }
  };

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="account-settings">
      <h1>Configuración de la Cuenta</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {user && <AccountForm user={user} onSave={handleSave} />}
    </div>
  );
};

export default AccountSettingsPage;
