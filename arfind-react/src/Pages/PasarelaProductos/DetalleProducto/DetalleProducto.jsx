import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DetalleProducto.css';
import { getPlanes } from '../../../services/planesService'; // Servicio para obtener planes
import { getProductoById } from '../../../services/productosService'; // Servicio para obtener el producto por ID

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
        const planesValidos = planesData.filter((plan) => plan.titulo); // Filtrar solo planes válidos
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

  const handleComprarAhora = () => {
    if (planSeleccionado) {
      alert(`Has seleccionado el plan ID: ${planSeleccionado}`);
      // Implementa aquí la lógica para redirigir o procesar la compra
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
                  {plan.titulo}
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
