import { apiFetch } from './api'; // Usa tu función genérica de `apiFetch`

/**
 * Registra un nuevo usuario enviando los datos al backend.
 * @param {Object} userData - Datos del usuario a registrar (nombre, apellido, email, telefono, edad, password).
 * @returns {Object} Respuesta del servidor, típicamente { message, userId }.
 * @throws {Error} Si ocurre un error durante el registro.
 */
export const registerUser = async (userData) => {
  // Validación básica de los datos antes de enviarlos
  if (!userData.nombre || !userData.apellido || !userData.email || !userData.password) {
    throw new Error('Todos los campos son obligatorios');
  }

  try {
    const response = await apiFetch('/auth/registerUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    // Validar estructura esperada de la respuesta
    if (!response || !response.message || !response.userId) {
      throw new Error('La respuesta del servidor no es válida');
    }

    return response;
  } catch (error) {
    // Mejor manejo del error con detalles
    if (error.response) {
      // Error del servidor
      console.error('Error del servidor en registerUser:', error.response);
    } else {
      // Error de red u otro problema
      console.error('Error de red o cliente en registerUser:', error.message);
    }

    throw error;
  }
};

export const sendCodeByMail = async (data) => {
  return await apiFetch('/auth/sendCodeByMail', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

/**
 * Verifica un PIN enviado al correo del usuario.
 * @param {Object} params - Parámetros de la solicitud (email y pin).
 * @returns {Object} Respuesta del servidor.
 * @throws {Error} Si ocurre un error en la verificación.
 */
export const verifyPin = async ({ email, pin }) => {
  try {
    const queryParams = new URLSearchParams({ email, pin }).toString(); // Codifica los parámetros en la URL
    const response = await apiFetch(`/auth/verifyPin?${queryParams}`, {
      method: 'GET', // Confirmamos que es un GET
    });
    return response;
  } catch (error) {
    console.error('Error en la verificación del PIN:', error);
    throw error;
  }
};
