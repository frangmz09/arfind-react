import { apiFetch } from './api';

export const getDispositivosByUsuario = async (token) => {
  try {
    const response = await apiFetch('/dispositivos/getDispositivosByUsuario', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching dispositivos:', error);
    throw error;
  }
};
