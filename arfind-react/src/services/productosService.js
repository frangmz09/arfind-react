import { apiFetch } from './api';

export const getProductos = async () => {
    return await apiFetch('/productos/productos');
};

export const getProductoById = async (id) => {
    try {
        const response = await apiFetch(`/productos/productos/${id}`); // Realiza la solicitud al endpoint
        return response; // Devuelve el producto
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        throw error; // Manejo de errores
    }
};
