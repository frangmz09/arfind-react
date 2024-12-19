import React, { useState } from 'react';
import './Contact.css'; // Archivo CSS para estilos

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Consulta General', // Valor por defecto
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;
    const recipientEmail = 'soporte@arfind.com'; // Dirección de correo de destino
    const finalSubject = `${subject} - ${name}`;

    // Construir el cuerpo con saltos de línea normales
    const body = `
    Nombre: ${name}
    Email: ${email}
    Asunto: ${subject}
    Mensaje:
    ${message}
    `;
    const encodedSubject = encodeURIComponent(finalSubject);
    const encodedBody = encodeURIComponent(body);

    // Abre el cliente de correo
    window.location.href = `mailto:${recipientEmail}?subject=${encodedSubject}&body=${encodedBody}`;
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Contáctanos</h1>
        <p style={styles.subtitle}>
          Nos encantaría saber de ti. Completa el formulario o usa nuestras vías de contacto para cualquier consulta.
        </p>
      </header>

      <section style={styles.formSection}>
        <h2 style={styles.title}>Formulario de Contacto</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="name">Nombre</label>
            <input
              style={styles.input}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">Correo Electrónico</label>
            <input
              style={styles.input}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Nuevo campo de Asunto */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="subject">Asunto</label>
            <select
              style={styles.input}
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="Consulta General">Consulta General</option>
              <option value="Problema Técnico">Problema Técnico</option>
              <option value="Solicitud de Información">Solicitud de Información</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="message">Mensaje</label>
            <textarea
              style={styles.textarea}
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" style={styles.button}>Enviar Mensaje</button>
        </form>
      </section>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Poppins, sans-serif',
    color: '#252525',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    lineHeight: '1.6',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '2.5em',
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: '1.1em',
    color: '#5C5C5C',
    maxWidth: '600px',
    margin: '10px auto',
  },
  formSection: {
    marginTop: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '1em',
    marginBottom: '5px',
    color: '#333',
  },
  input: {
    padding: '10px',
    fontSize: '1em',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    fontSize: '1em',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'vertical',
  },
  button: {
    padding: '10px 15px',
    fontSize: '1em',
    color: '#fff',
    backgroundColor: '#0D8BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    alignSelf: 'center',
  },
};

export default Contact;
