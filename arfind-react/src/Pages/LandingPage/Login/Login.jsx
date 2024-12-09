import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../../../Context/AuthContext';
import './Login.css';
import BtnAux from '../../../Componentes/BtnAux/BtnAux';
import Logo from '../../../Componentes/Logo/Logo';

const Login = () => {
  const { handleLogin } = useAuth(); // Utiliza el método del AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let formErrors = {};

    if (!email.trim()) {
      formErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'El correo electrónico no es válido.';
    }

    if (!password.trim()) {
      formErrors.password = 'La contraseña es obligatoria.';
    } else if (password.length < 6) {
      formErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        localStorage.setItem('userToken', token);

        handleLogin(); // Llama a handleLogin desde el contexto
      } catch (error) {
        console.error("Error de autenticación: ", error);
        setErrors({ general: 'Error al iniciar sesión. Por favor, revisa tus credenciales.' });
      }
    }
  };

  return (
    <div className="page-container">
      <div className="logo-container">
        <Logo type="logo" altText="Logo Rectangular" size="25rem" />
      </div>
      <div className="login-container">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className={`login-input ${errors.email ? 'error' : ''}`}>
            <label htmlFor="EMAIL">Correo</label>
            <input 
              type="text" 
              id="EMAIL" 
              name="EMAIL" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              autoComplete="off"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className={`login-input ${errors.password ? 'error' : ''}`}>
            <label htmlFor="PASS">Contraseña</label>
            <input 
              type="password" 
              id="PASS" 
              name="PASS" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              autoComplete="off"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          {errors.general && <span className="error-message">{errors.general}</span>}
          <button className="login-btn" type="submit">INGRESAR</button>
          <div className="login-separator">
            <span>Iniciar sesión con</span>
          </div>
          <div className="login-options">
            <BtnAux className="login-btn-op"
              image="/images/login_facebook.png" 
              link="https://www.facebook.com" 
              altText="Loguearse con Facebook" 
            />
            <BtnAux className="login-btn-op"
              image="/images/login_instagram.png" 
              link="https://www.instagram.com" 
              altText="Loguearse con Instagram" 
            />
            <BtnAux className="login-btn-op"
              image="/images/login_google.png" 
              link="https://www.google.com" 
              altText="Loguearse con Google" 
            />
          </div>
          <div className="login-register">
            <span>No tienes cuenta? <a href="/register">Regístrate aquí</a></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
