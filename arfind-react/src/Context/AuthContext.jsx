import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

// Crea el contexto
const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Usuario autenticado
        setIsLoggedIn(true);
      } else {
        // Usuario no autenticado o token vencido
        setIsLoggedIn(false);
        localStorage.removeItem('userToken'); // Limpia el token
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      localStorage.removeItem('userToken');
      console.log('Sesión cerrada y token eliminado.');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto
export const useAuth = () => useContext(AuthContext);
