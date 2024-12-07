import { apiFetch } from './api';

// Obtener notificaciones del usuario autenticado
export const getMisNotificaciones = async (token) => {
  try {
    const response = await apiFetch('/notificaciones/misNotificaciones', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching user notifications:', error);
    throw error;
  }
};