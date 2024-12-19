import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://arfindfranco-t22ijacwda-uc.a.run.app';

export const apiFetch = async (endpoint, options = {}, showToast) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          const auth = getAuth();
          await signOut(auth);
          localStorage.removeItem('userToken');
          if (showToast) showToast('Sesión expirada. Por favor, inicia sesión nuevamente.', 'error');
          window.location.href = '/login';
        }
        throw new Error(`HTTP Error: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('API Fetch Error:', error);
      throw error;
    }
  };
  
