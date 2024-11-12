import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './NavBarButton.css';

const NavBarButton = ({ imgSrc, altText, isProfileButton, onClick, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (e) => {
    if (isProfileButton) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar-button-container" ref={dropdownRef}>
      <button 
        className="navbar-button" 
        onClick={isProfileButton ? toggleDropdown : onClick} 
        aria-label={altText}
      >
        <img src={imgSrc} alt={altText} className="button-icon" />
      </button>
      {isProfileButton && (
        <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
          <Link to="/account-settings" className="dropdown-item">
            Configuración de la cuenta
          </Link>
          <button className="dropdown-item logout" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};


NavBarButton.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  isProfileButton: PropTypes.bool,
  onClick: PropTypes.func, // Agregado para manejar clics en botones no de perfil
  onLogout: PropTypes.func.isRequired,
};

export default NavBarButton;
