// Register.js

import React, { useState } from 'react';
import './Register.css';
import BtnAux from '../BtnAux/BtnAux';
import Logo from '../Logo/Logo';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig.js'; // Asegúrate de ajustar la ruta correctamente

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let formErrors = {};

    // Validación de nombre
    if (!formData.nombre.trim()) {
      formErrors.nombre = 'El nombre es obligatorio.';
    }

    // Validación de apellido
    if (!formData.apellido.trim()) {
      formErrors.apellido = 'El apellido es obligatorio.';
    }

    // Validación de correo
    if (!formData.email.trim()) {
      formErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'El correo electrónico no es válido.';
    }

    // Validación de teléfono
    if (!formData.telefono.trim()) {
      formErrors.telefono = 'El teléfono es obligatorio.';
    }

    // Validación de contraseña
    if (!formData.password.trim()) {
      formErrors.password = 'La contraseña es obligatoria.';
    } else if (formData.password.length < 6) {
      formErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    // Validación de confirmación de contraseña
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      try {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        setSuccessMessage('¡Registro exitoso! Redirigiendo...');
        setFormData({
          nombre: '',
          apellido: '',
          email: '',
          telefono: '',
          password: '',
          confirmPassword: ''
        });
        // Aquí puedes redirigir al usuario o mostrar un mensaje
        // Por ejemplo, puedes usar `useNavigate` de react-router-dom para redirigir a otra página
      } catch (error) {
        setErrors({ general: error.message });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="page-container">
      <div className="register-logo-container">
        <Logo type="logo" altText="Logo Rectangular" size="10rem" />
      </div>
      <div className="register-container">
        <form onSubmit={handleSubmit} autoComplete="off">
          <h2 className='register-title'>Registro</h2>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errors.general && <p className="error-message">{errors.general}</p>}
          <div className="form-row">
            <div className={`register-input ${errors.nombre ? 'error' : ''}`}>
              <label htmlFor="NOMBRE">Nombre</label>
              <input 
                type="text" 
                id="NOMBRE" 
                name="nombre" 
                value={formData.nombre} 
                onChange={handleChange} 
                autoComplete="off"
              />
              {errors.nombre && <span className="error-message">{errors.nombre}</span>}
            </div>
            <div className={`register-input ${errors.apellido ? 'error' : ''}`}>
              <label htmlFor="APELLIDO">Apellido</label>
              <input 
                type="text" 
                id="APELLIDO" 
                name="apellido" 
                value={formData.apellido} 
                onChange={handleChange} 
                autoComplete="off"
              />
              {errors.apellido && <span className="error-message">{errors.apellido}</span>}
            </div>
          </div>
  
          <div className="form-row">
            <div className={`register-input ${errors.email ? 'error' : ''}`}>
              <label htmlFor="EMAIL">Correo</label>
              <input 
                type="text" 
                id="EMAIL" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                autoComplete="off"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className={`register-input ${errors.telefono ? 'error' : ''}`}>
              <label htmlFor="TELEFONO">Teléfono</label>
              <input 
                type="text" 
                id="TELEFONO" 
                name="telefono" 
                value={formData.telefono} 
                onChange={handleChange} 
                autoComplete="off"
              />
              {errors.telefono && <span className="error-message">{errors.telefono}</span>}
            </div>
          </div>
  
          <div className="form-row">
            <div className={`register-input ${errors.password ? 'error' : ''}`}>
              <label htmlFor="PASS">Contraseña</label>
              <input 
                type="password" 
                id="PASS" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                autoComplete="off"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            <div className={`register-input ${errors.confirmPassword ? 'error' : ''}`}>
              <label htmlFor="CONFIRM_PASS">Confirmar Contraseña</label>
              <input 
                type="password" 
                id="CONFIRM_PASS" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                autoComplete="off"
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </div>
  
          <button className="register-btn" type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'REGISTRARSE'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
