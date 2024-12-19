import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css'; // Archivo CSS específico para esta tarjeta

const ProductCard = ({ id, title, description, imageSrc, hasStock }) => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate(`/producto/${id}`); // Redirige al detalle del producto
  };

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
        {hasStock ? (
          <button className="buy-now-btn" onClick={handleBuyNow}>
            Comprar ahora
          </button>
        ) : (
          <p className="no-stock-message">Sin stock</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
