import { apiFetch } from './api'; // Mantén consistencia usando apiFetch en lugar de mezclar con axios

export const generateCodigoInvitado = async (deviceId, token) => {
  try {
    const response = await apiFetch('/dispositivos/generateCodigoInvitado', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Asegúrate de incluir el tipo de contenido
      },
      body: JSON.stringify({ deviceId }), // Serializa el cuerpo de la solicitud
    });
    return response;
  } catch (error) {
    console.error('Error generating codigo invitado:', error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};

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

export const getDispositivosInvitados = async (token) => {
  try {
    const response = await apiFetch('/dispositivos/getDispositivosInvitados', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching dispositivos invitados:', error);
    throw error;
  }
};
