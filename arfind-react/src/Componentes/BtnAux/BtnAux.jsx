import React from 'react';
import './BtnAux.css';
import { Link } from 'react-router-dom';

const BtnAux = ({ image, link, altText, className }) => {
  return (
    <Link to={link}  className={`btn-aux ${className}`}>
        <img src={image} alt={altText} className="btn-aux-img" />
    </Link>
  );
};

export default BtnAux;
