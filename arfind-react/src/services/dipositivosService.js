import { apiFetch } from './api';

export const generateCodigoInvitado = async (deviceId, token) => {
  try {
    const response = await apiFetch('/dispositivos/generateCodigoInvitado', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deviceId }),
    });
    return response;
  } catch (error) {
    console.error('Error generating codigo invitado:', error);
    throw error;
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

// Modificar apodo del dispositivo
export const updateApodoDispositivo = async (deviceId, apodo, token) => {
  try {
    const response = await apiFetch('/dispositivos/updateApodoDispositivo', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deviceId, apodo }),
    });
    return response;
  } catch (error) {
    console.error('Error updating apodo del dispositivo:', error);
    throw error;
  }
  
};

export const submitCodigoInvitado = async (codigoInvitado, token) => {
  try {
    const response = await apiFetch('/dispositivos/submitCodigoInvitado', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ codigo_invitado: codigoInvitado }),
    });
    return response;
  } catch (error) {
    console.error('Error submitting codigo invitado:', error);
    throw error;
  }
};
