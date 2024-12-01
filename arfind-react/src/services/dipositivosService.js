import { apiFetch } from './api';

// Generar un código de invitado
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

// Obtener dispositivos del usuario autenticado
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

// Obtener dispositivos donde el usuario es invitado
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

// Enviar código de invitado
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

// Configurar dispositivo (darse de baja, eliminar invitados, cambiar plan)
export const configureDispositivo = async (deviceId, action, updates, token) => {
  try {
    const response = await apiFetch('/dispositivos/configureDispositivo', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deviceId, action, updates }),
    });
    return response;
  } catch (error) {
    console.error('Error configuring dispositivo:', error);
    throw error;
  }
};

export const eliminarInvitados = async (deviceId, invitedUsers, token) => {
  if (!Array.isArray(invitedUsers) || invitedUsers.length === 0) {
    throw new Error('La lista de usuarios invitados para eliminar no puede estar vacía.');
  }
  return await configureDispositivo(deviceId, 'eliminarInvitados', { invitedUsers }, token);
};

// Cambiar plan
export const cambiarPlan = async (deviceId, planId, token) => {
  if (!planId) {
    throw new Error('El ID del nuevo plan es requerido para cambiar el plan.');
  }
  return await configureDispositivo(deviceId, 'cambiarPlan', { planId }, token);
};
// Darse de baja
export const darseDeBaja = async (deviceId, token) => {
  return await configureDispositivo(deviceId, 'darseDeBaja', null, token);
};
