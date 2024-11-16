import { apiFetch } from './api';

export const getPlanes = async () => {
    const response = await apiFetch('/planes/getPlanes');
    return response.data; // Se asume que 'data' está presente en la respuesta
};
