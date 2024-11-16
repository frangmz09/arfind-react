import React, { useState, useEffect } from 'react';
import './DetalleProducto.css';

const DetalleProducto = ({ producto }) => {
  const [planes, setPlanes] = useState([]);
  const [planSeleccionado, setPlanSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const response = await fetch(
          'https://arfindfranco-t22ijacwda-uc.a.run.app/planes/getPlanes'
        );
        if (!response.ok) {
          throw new Error('Error al obtener los planes');
        }
        const data = await response.json();
        // Filtrar planes con título válido
        const planesValidos = data.data.filter((plan) => plan.titulo);
        setPlanes(planesValidos);
      } catch (error) {
        console.error('Error al obtener los planes:', error);
        setPlanes([]);
      } finally {
        setCargando(false);
      }
    };

    fetchPlanes();
  }, []);

  const handlePlanChange = (event) => {
    setPlanSeleccionado(event.target.value);
  };

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
          {cargando ? (
            <p>Cargando planes...</p>
          ) : planes.length > 0 ? (
            <select
              id="plan-select"
              className="detalle-producto__select"
              onChange={handlePlanChange}
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
        >
          Comprar ahora
        </button>
      </div>
    </div>
  );
};

export default DetalleProducto;
