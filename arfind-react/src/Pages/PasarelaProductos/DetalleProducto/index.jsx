
import React, { useState } from 'react';
import { usePlanes } from '../../../hooks/usePlanes';
import './DetalleProducto.css';

const DetalleProducto = ({ producto }) => {
  const { data: planes, loading, error } = usePlanes();
  const [planSeleccionado, setPlanSeleccionado] = useState(null);

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
          {loading ? (
            <p>Cargando planes...</p>
          ) : error ? (
            <p>Error al cargar los planes.</p>
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
