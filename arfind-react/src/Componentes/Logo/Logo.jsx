import React from 'react';
import logoSquare from '/images/icon.png';
import logoRectangle from '/images/logo.png';
import { useLocation } from 'react-router-dom';

const Logo = ({ type = 'icon', altText = "Logo", size = "100px" }) => {
  const isLandingPage = (location.pathname === '/landing' || location.pathname === '/about' || location.pathname === '/contact');
  const logoSrc = isLandingPage ? logoRectangle : (type === 'logo' ? logoRectangle : logoSquare);
  

  const logoStyle = {
    width: size,
    height: "auto", 
  };

  return (
    <img src={logoSrc} alt={altText} style={logoStyle} />
  );
};

export default Logo;
