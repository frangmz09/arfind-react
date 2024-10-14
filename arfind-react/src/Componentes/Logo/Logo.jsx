import React from 'react';
import logoSquare from '/images/icon.png';
import logoRectangle from '/images/logo.png';

const Logo = ({ type = 'icon', altText = "Logo", size = "100px" }) => {
  const logoSrc = type === 'logo' ? logoRectangle : logoSquare;

  const logoStyle = {
    width: size,
    height: "auto", 
  };

  return (
    <img src={logoSrc} alt={altText} style={logoStyle} />
  );
};

export default Logo;
