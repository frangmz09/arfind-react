import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la redirección
import './ProductCard.css'; // Archivo CSS específico para esta tarjeta

const ProductCard = ({ id, title, description, imageSrc }) => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    // Redirige al detalle del producto usando su ID
    navigate(`/producto/${id}`);
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
        <button className="buy-now-btn" onClick={handleBuyNow}>
          Comprar ahora
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
