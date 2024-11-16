
import { useFetch } from './useFetch';
import { getPlanes } from '../services/planesService';

export const usePlanes = () => {
    return useFetch(getPlanes);
};
