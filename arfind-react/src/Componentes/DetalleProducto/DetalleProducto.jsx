import React from 'react';
import './DetalleProducto.css';

const DetalleProducto = ({ producto }) => {
  return (
    <div className="detalle-producto">
      <div className="detalle-producto__imagen">
        <img src={producto.imagen} alt={producto.titulo} />
      </div>
      <div className="detalle-producto__informacion">
        <h2 className="detalle-producto__titulo">{producto.titulo}</h2>
        <p className="detalle-producto__descripcion">{producto.descripcion}</p>
        <p className="detalle-producto__precio">{`$${producto.precio}`}</p>
        <button className="detalle-producto__boton-comprar">Comprar ahora</button>
      </div>
    </div>
  );
};

export default DetalleProducto;
