import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DetalleProducto.css';
import { getPlanes } from '../../../services/planesService'; // Servicio para obtener planes
import { getProductoById } from '../../../services/productosService'; // Servicio para obtener el producto por ID
import { crearOrdenDinamicaWeb } from '../../../services/pagosService'; // Servicio de pagos

const DetalleProducto = () => {
  const { id } = useParams(); // Obtén el ID del producto desde la URL
  const [producto, setProducto] = useState(null);
  const [planes, setPlanes] = useState([]);
  const [planSeleccionado, setPlanSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Carga del producto
        const productoData = await getProductoById(id);
        setProducto(productoData);

        // Carga de planes
        const planesData = await getPlanes();
        const planesValidos = planesData.filter((plan) => plan.nombre); // Filtrar solo planes válidos
        setPlanes(planesValidos);
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
    setPlanSeleccionado(event.target.value);
  };

  const handleComprarAhora = async () => {
    if (planSeleccionado) {
      try {
        const orden = {
          nombreProducto: producto.titulo,
          descripcionProducto: producto.descripcion,
          imagenProducto: producto.imagen,
          cantidad: 1, // Siempre 1 porque es un único producto
          precio: producto.precio, // Precio del producto
        };

        // Llamar al servicio para crear la orden
        const response = await crearOrdenDinamicaWeb(orden);
        
        // Redirigir al usuario a la URL de Mercado Pago
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
    return <p className="error-message">{error}</p>;
  }

  if (!producto) {
    return <p>No se encontró el producto.</p>;
  }

  return (
    <div className="detalle-producto">
      <div className="detalle-producto__imagen">
        <img src={producto.imagen} alt={producto.titulo} />
      </div>
      <div className="detalle-producto__informacion">
        <h2 className="detalle-producto__titulo">{producto.titulo}</h2>
        <p className="detalle-producto__descripcion">{producto.descripcion}</p>
        <p className="detalle-producto__precio">{`$${producto.precio.toFixed(2)}`}</p>
        <div className="detalle-producto__planes">
          <label htmlFor="plan-select" className="detalle-producto__label">
            Seleccione un plan:
          </label>
          {planes.length > 0 ? (
            <select
              id="plan-select"
              className="detalle-producto__select"
              onChange={handlePlanChange}
              value={planSeleccionado || ''}
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
        <button
          className="detalle-producto__boton-comprar"
          disabled={!planSeleccionado}
          onClick={handleComprarAhora}
        >
          Comprar ahora
        </button>
      </div>
    </div>
  );
};

export default DetalleProducto;
