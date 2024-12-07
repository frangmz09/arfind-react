import { apiFetch } from './api'; // Asegúrate de usar tu helper para fetch

export const crearOrdenDinamicaWeb = async (orden, token) => {
  try {
    const response = await apiFetch('/mercadopago/crearOrdenDinamicaWeb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Tipo de contenido
        Authorization: `Bearer ${token}`, // Incluye el token en el encabezado Authorization
      },
      body: JSON.stringify({
        idProducto: orden.idProducto, // ID del producto
        idPlan: orden.idPlan, // ID del plan
      }),
    });
    return response; // Devuelve la respuesta (URL de Mercado Pago)
  } catch (error) {
    console.error('Error creando orden dinámica:', error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};
