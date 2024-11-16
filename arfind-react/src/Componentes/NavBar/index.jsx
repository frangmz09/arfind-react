
import React from 'react';
import './NavBar.css';
import NavBarButton from '../NavBarButton';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">Mi App</div>
      <div className="navbar__buttons">
        <NavBarButton imgSrc="/icons/home.svg" altText="Inicio" />
        <NavBarButton imgSrc="/icons/user.svg" altText="Perfil" isProfileButton />
      </div>
    </nav>
  );
};

export default NavBar;
