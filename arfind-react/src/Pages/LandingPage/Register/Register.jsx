import React, { useState } from 'react';
import './Register.css';
import BtnAux from '../../../Componentes/BtnAux/BtnAux';
import Logo from '../../../Componentes/Logo/Logo';
import { sendCodeByMail, verifyPin, registerUser } from '../../../services/authService';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../../firebaseConfig';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    edad: '',
    aceptaTerminos: false, // Nuevo campo para el checkbox
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
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
    if (!formData.edad.trim() || isNaN(formData.edad)) {
      formErrors.edad = 'La edad es obligatoria y debe ser un número.';
    } else if (parseInt(formData.edad, 10) < 18) {
      formErrors.edad = 'Debes tener al menos 18 años para registrarte.';
    }
    if (!formData.password.trim()) formErrors.password = 'La contraseña es obligatoria.';
    else if (formData.password.length < 6) formErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = 'Las contraseñas no coinciden.';
    if (!formData.aceptaTerminos) {
      formErrors.aceptaTerminos = 'Debes aceptar los términos y condiciones.';
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      try {
        await sendCodeByMail({ email: formData.email, nombre: formData.nombre });
        setShowPinModal(true);
      } catch (error) {
        setErrors({ general: 'Error al enviar el PIN. Inténtalo nuevamente.' });
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePinSubmit = async () => {
    setLoading(true);
    try {
      const response = await verifyPin({ email: formData.email, pin });
      if (response.result) {
        await registerUser(formData);
        setSuccessMessage('¡Registro exitoso! Redirigiendo al login...');
        setTimeout(() => navigate('/login'), 3000); // Redirigir tras 3 segundos
      } else {
        setErrors({ general: 'PIN inválido. Inténtalo nuevamente.' });
      }
    } catch (error) {
      setErrors({ general: 'Error al validar el PIN. Inténtalo nuevamente.' });
    } finally {
      setLoading(false);
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

          <div className="form-row">
            <div className="checkbox-container">
              <label>
                <input
                  type="checkbox"
                  name="aceptaTerminos"
                  checked={formData.aceptaTerminos}
                  onChange={handleChange}
                />
                Acepto los{' '}
                <a
                  href="https://sites.google.com/view/tyc-arfind/inicio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  términos y condiciones
                </a>
              </label>
              {errors.aceptaTerminos && <span className="error-message">{errors.aceptaTerminos}</span>}
            </div>
          </div>

          <button className="register-btn" type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'REGISTRARSE'}
          </button>
        </form>
      </div>

      {showPinModal && (
        <div className="pin-modal-overlay">
          <div className="pin-modal">
            <h3>Verifica tu correo</h3>
            <p>Hemos enviado un código de verificación a tu correo. Ingresa el PIN para continuar.</p>
            <input
              type="text"
              className="pin-input"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Ingresa el PIN"
              maxLength="6"
            />
            <div className="pin-modal-buttons">
              <button className="validate-pin-btn" onClick={handlePinSubmit} disabled={loading}>
                {loading ? 'Validando...' : 'Validar PIN'}
              </button>
              <button
                className="close-pin-modal-btn"
                onClick={() => setShowPinModal(false)}
                disabled={loading}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
