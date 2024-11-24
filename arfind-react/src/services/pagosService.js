import { apiFetch } from './api'; // Mantén consistencia usando apiFetch

export const crearOrdenDinamicaWeb = async (orden) => {
  try {
    const response = await apiFetch('/mercadopago/crearOrdenDinamicaWeb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Asegúrate de incluir el tipo de contenido
      },
      body: JSON.stringify({
        nombreProducto: orden.nombreProducto,
        descripcionProducto: orden.descripcionProducto,
        imagenProducto: orden.imagenProducto,
        cantidad: orden.cantidad,
        precio: orden.precio,
      }),
    });
    return response; // Devuelve la respuesta (URL de Mercado Pago)
  } catch (error) {
    console.error('Error creando orden dinámica:', error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};
