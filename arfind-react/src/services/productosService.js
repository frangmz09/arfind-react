import { apiFetch } from './api';

export const getProductos = async () => {
    return await apiFetch('/productos/productos');
};
