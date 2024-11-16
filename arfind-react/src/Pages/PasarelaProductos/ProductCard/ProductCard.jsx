import React from 'react';
import './ProductCard.css'; // Archivo CSS específico para esta tarjeta

const ProductCard = ({ title, description, imageSrc }) => {
  return (
    <div className="product-card">
      <img 
        src={imageSrc} 
        alt="Imagen del producto" 
        className="product-image" 
      />
      <div className="product-info">
        <h2 className="product-title">{title}</h2>
        <p className="product-description">{description}</p>
        <button className="buy-now-btn">Comprar ahora</button>
      </div>
    </div>
  );
};

export default ProductCard;
