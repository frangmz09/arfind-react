import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './DetalleProducto.module.css';
import BtnAux from '../../../Componentes/BtnAux/BtnAux'; // Asegúrate de importar BtnAux
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
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, [id]);

  const handlePlanChange = (event) => {
    const planId = event.target.value;
    const plan = planes.find((p) => p.id === planId);
    setPlanSeleccionado(plan);
  };

  const handleComprarAhora = async () => {
    if (planSeleccionado) {
      try {
        const orden = {
          nombreProducto: producto.titulo,
          descripcionProducto: producto.descripcion,
          imagenProducto: producto.imagen,
          cantidad: 1,
          precio: producto.precio,
        };

        const response = await crearOrdenDinamicaWeb(orden);
        window.location.href = response.url;
      } catch (error) {
        console.error('Error al procesar la compra:', error);
        alert('Hubo un problema al procesar la compra. Por favor, inténtalo nuevamente.');
      }
    } else {
      alert('Por favor, seleccione un plan antes de continuar.');
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
