import { apiFetch } from './api';

// Obtener información del cliente
export const getCliente = async (token) => {
  try {
    const response = await apiFetch('/clientes/getCliente', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching client data:', error);
    throw error;
  }
};

// Actualizar información del cliente
export const updateCliente = async (token, updates) => {
  try {
    console.log('Token:', token); // Verifica si el token es correcto
    console.log('Updates:', updates); // Verifica los datos enviados
    const response = await apiFetch('/clientes/updateCliente', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`, // Asegúrate de que "Bearer" está incluido
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    console.log('Response recibido:', response); // Muestra el response para verificar
    return response; // Devuelve directamente si `apiFetch` ya devuelve el JSON procesado
  } catch (error) {
    console.error('Error updating client data:', error);
    throw error;
  }
};
