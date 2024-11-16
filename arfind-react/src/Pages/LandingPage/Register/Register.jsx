import React, { useState } from 'react';
import './Register.css';
import BtnAux from '../../../Componentes/BtnAux/BtnAux';
import Logo from '../../../Componentes/Logo/Logo';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../../firebaseConfig'; // Ajusta la ruta según tu configuración
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    edad: '' // Asegúrate de agregar el campo `edad` si es necesario
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};

    // Validación de campos
    if (!formData.nombre.trim()) formErrors.nombre = 'El nombre es obligatorio.';
    if (!formData.apellido.trim()) formErrors.apellido = 'El apellido es obligatorio.';
    if (!formData.email.trim()) formErrors.email = 'El correo electrónico es obligatorio.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'El correo electrónico no es válido.';
    if (!formData.telefono.trim()) formErrors.telefono = 'El teléfono es obligatorio.';
    if (!formData.edad.trim() || isNaN(formData.edad)) formErrors.edad = 'La edad es obligatoria y debe ser un número.';
    if (!formData.password.trim()) formErrors.password = 'La contraseña es obligatoria.';
    else if (formData.password.length < 6) formErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = 'Las contraseñas no coinciden.';

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      setSuccessMessage('');

      try {
        const response = await fetch('https://arfindfranco-t22ijacwda-uc.a.run.app/clientes/registerUser', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              nombre: formData.nombre,
              apellido: formData.apellido,
              email: formData.email,
              telefono: formData.telefono,
              edad: formData.edad,
              password: formData.password,
          }),
      });


        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Error en el registro');
        }

        setSuccessMessage('¡Registro exitoso!');
        setFormData({
          nombre: '',
          apellido: '',
          email: '',
          telefono: '',
          password: '',
          confirmPassword: '',
          edad: '',
        });

      } catch (error) {
        setErrors({ general: error.message || 'Error en el registro. Por favor intenta nuevamente.' });
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
          <h2 className="register-title">Registro</h2>
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
            <div className={`register-input ${errors.edad ? 'error' : ''}`}>
              <label htmlFor="EDAD">Edad</label>
              <input
                type="text"
                id="EDAD"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.edad && <span className="error-message">{errors.edad}</span>}
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
