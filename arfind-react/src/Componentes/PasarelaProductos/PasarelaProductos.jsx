import React, { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard'; // Asegúrate de que la ruta sea correcta
import './PasarelaProductos.css';

const PasarelaProductos = ({ products, height }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 25; // Ajusta esto según el ancho de tus tarjetas en porcentaje
  const spacing = 10; // Espacio en porcentaje entre tarjetas
  const moveAmount = cardWidth + spacing;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    const maxIndex = Math.ceil(products.length * (cardWidth + spacing) / 100) - 1;
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  return (
    <div className="pasarela-container" style={{ height }}>
      <button className="arrow-btn left" onClick={handlePrev}>
        <img src="/images/arrow1.png" alt="Anterior" />
      </button>
      <div className="pasarela-products">
        <div
          className="products-wrapper"
          style={{ transform: `translateX(-${currentIndex * moveAmount}%)` }}
        >
          {products.map((producto, index) => (
            <ProductCard 
              key={index}
              title={producto.titulo}
              description={producto.tinydescripcion}
              imageSrc={producto.imagen}
            />
          ))}
        </div>
      </div>
      <button className="arrow-btn right" onClick={handleNext}>
        <img src="/images/arrow2.png" alt="Siguiente" />
      </button>
    </div>
  );
};

export default PasarelaProductos;
