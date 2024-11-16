
import React from 'react';
import DetalleProducto from './DetalleProducto';
import ProductCard from './ProductCard';
import styles from './PasarelaProductos.module.css';

const PasarelaProductos = () => {
  return (
    <div className={styles.pasarelaProductos}>
      <h1 className={styles.pasarelaProductos__title}>Pasarela de Productos</h1>
      <div className={styles.pasarelaProductos__list}>
        <ProductCard producto={{ titulo: "Producto 1", precio: 100 }} />
        <ProductCard producto={{ titulo: "Producto 2", precio: 200 }} />
      </div>
      <DetalleProducto producto={{ titulo: "Producto Seleccionado", precio: 300, descripcion: "Descripción del producto", imagen: "/images/product.png" }} />
    </div>
  );
};

export default PasarelaProductos;
