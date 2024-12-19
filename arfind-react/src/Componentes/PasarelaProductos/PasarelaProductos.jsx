import React, { useState, useEffect } from 'react';
import ProductCard from '../../Pages/PasarelaProductos/ProductCard/ProductCard';
import './PasarelaProductos.css';

const PasarelaProductos = ({ products, height }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);

  const cardWidth = 25; // Ancho de cada tarjeta (%)
  const spacing = 10; // Espacio entre tarjetas (%)
  const cardsVisible = 3; // Máximo número de tarjetas visibles
  const moveAmount = cardWidth + spacing;

  useEffect(() => {
    setShowArrows(products.length > cardsVisible);
  }, [products]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    const maxIndex = Math.max(0, products.length - cardsVisible);
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  return (
    <div className="pasarela-container" style={{ height }}>
      {showArrows && (
        <button className="arrow-btn left" onClick={handlePrev}>
          <img src="/images/arrow1.png" alt="Anterior" />
        </button>
      )}
      <div className="pasarela-products">
        <div
          className="products-wrapper"
          style={{
            transform: `translateX(-${currentIndex * moveAmount}%)`,
            width: `${products.length * (cardWidth + spacing)}%`,
          }}
        >
          {products.map((producto, index) => (
            <ProductCard
              key={producto.id || index}
              id={producto.id}
              title={producto.titulo}
              description={producto.tiny_descripcion}
              imageSrc={producto.imagen}
              hasStock={producto.has_stock}
            />
          ))}
        </div>
      </div>
      {showArrows && (
        <button className="arrow-btn right" onClick={handleNext}>
          <img src="/images/arrow2.png" alt="Siguiente" />
        </button>
      )}
    </div>
  );
};

export default PasarelaProductos;
