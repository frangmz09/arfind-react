import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './DetalleProducto.module.css';
import BtnAux from '../../../Componentes/BtnAux/BtnAux';
import Toast from '../../../Componentes/Toast/Toast'; // Importar el Toast
import { getPlanes } from '../../../services/planesService';
import { getProductoById } from '../../../services/productosService';
import { crearOrdenDinamicaWeb } from '../../../services/pagosService';

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [planes, setPlanes] = useState([]);
  const [planSeleccionado, setPlanSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(''); // Estado para el mensaje del Toast
  const [toastType, setToastType] = useState('success'); // Estado para el tipo de Toast
  const [showToast, setShowToast] = useState(false); // Estado para mostrar el Toast

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productoData = await getProductoById(id);
        setProducto(productoData);

        const planesData = await getPlanes();
        setPlanes(planesData.filter((plan) => plan.nombre));
      } catch (err) {
        console.error('Error al cargar los datos:', err);
        setError('Error al cargar el producto o los planes.');
        showToastMessage('Error al cargar los datos. Inténtalo nuevamente.', 'error');
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, [id]);

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    // Ocultar el Toast después de 3 segundos
    setTimeout(() => setShowToast(false), 3000);
  };

  const handlePlanChange = (event) => {
    const planId = event.target.value;
    const plan = planes.find((p) => p.id === planId);
    setPlanSeleccionado(plan);
  };

  const handleComprarAhora = async () => {
    if (planSeleccionado) {
      try {
        const token = localStorage.getItem('userToken'); // Obtener token
        if (!token) {
          showToastMessage('No estás autenticado. Por favor, inicia sesión.', 'error');
          return;
        }

        const orden = {
          idProducto: producto.id,
          idPlan: planSeleccionado.id,
        };

        const response = await crearOrdenDinamicaWeb(orden, token);
        window.location.href = response.url; // Redirige a Mercado Pago
      } catch (error) {
        console.error('Error al procesar la compra:', error);
        showToastMessage(
          'Hubo un problema al procesar la compra. Por favor, inténtalo nuevamente.',
          'error'
        );
      }
    } else {
      showToastMessage('Por favor, seleccione un plan antes de continuar.', 'error');
    }
  };

  if (cargando) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p className={styles.errorMessage}>{error}</p>;
  }

  if (!producto) {
    return <p>No se encontró el producto.</p>;
  }

  return (
    <div className={styles.detalleProductoWrapper}>
      {showToast && <Toast message={toastMessage} type={toastType} />} {/* Mostrar el Toast */}
      <div className={styles.detalleProducto}>
        <BtnAux
          className={styles.detalleProductoBtnVolver}
          image="/images/back.png"
          altText="Volver al inicio"
          link="/"
        />
        <div className={styles.detalleProductoImagen}>
          <img src={producto.imagen} alt={producto.titulo} />
        </div>
        <div className={styles.detalleProductoInformacion}>
          <h2 className={styles.detalleProductoTitulo}>{producto.titulo}</h2>
          <p className={styles.detalleProductoDescripcion}>{producto.descripcion}</p>
          <p className={styles.detalleProductoPrecio}>{`$${producto.precio.toFixed(2)}`}</p>
          <div className={styles.detalleProductoPlanes}>
            <label htmlFor="plan-select" className={styles.detalleProductoLabel}>
              Seleccione un plan:
            </label>
            {planes.length > 0 ? (
              <select
                id="plan-select"
                className={styles.detalleProductoSelect}
                onChange={handlePlanChange}
                value={planSeleccionado?.id || ''}
              >
                <option value="">Seleccione un plan</option>
                {planes.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.nombre}
                  </option>
                ))}
              </select>
            ) : (
              <p>No hay planes disponibles.</p>
            )}
          </div>
          {planSeleccionado && (
            <div className={styles.detalleProductoPlanDetalles}>
              <img
                src={planSeleccionado.imagen || 'https://placehold.co/50x50.png'}
                alt={planSeleccionado.nombre}
                className={styles.detalleProductoPlanImagen}
              />
              <div className={styles.detalleProductoPlanInfo}>
                <h3>{planSeleccionado.nombre}</h3>
                <p>{planSeleccionado.descripcion}</p>
                <p>
                  <strong>Precio:</strong> ${planSeleccionado.precio}/mes
                </p>
                <p>
                  <strong>Cantidad de compartidos:</strong>{' '}
                  {planSeleccionado.cantidad_compartidos}{' '}
                  {planSeleccionado.cantidad_compartidos === 1 ? 'persona' : 'personas'}
                </p>
                <p>
                  <strong>Refresco:</strong> Cada {planSeleccionado.refresco}{' '}
                  {planSeleccionado.refresco === 1 ? 'minuto' : 'minutos'}
                </p>
              </div>
            </div>
          )}
          <button
            className={styles.detalleProductoBotonComprar}
            disabled={!planSeleccionado}
            onClick={handleComprarAhora}
          >
            Comprar ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
