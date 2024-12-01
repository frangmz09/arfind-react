import React from 'react';
import { useLocation } from 'react-router-dom';
import './PanelMapa.css';
import Logo from '../../Componentes/Logo/Logo';
import BtnAux from '../../Componentes/BtnAux/BtnAux';
import Mapa from '../../Pages/Home/Mapa/Mapa';

const PanelMapa = () => {
  const { state } = useLocation(); // Obtén el estado pasado desde la navegación
  const locations = state?.locations || []; // Ubicaciones de los dispositivos

  return (
    <div className="PanelMapa-page">
      <BtnAux
        className="btnAux"
        image="/images/home.png"
        altText="Volver al inicio"
        link="/"
      />
      <div className="PanelMapa-logo">
        <Logo type="logo" altText="Logo" size="7rem" />
      </div>
      <Mapa locations={locations} /> {/* Pasar ubicaciones al componente Mapa */}
    </div>
  );
};

export default PanelMapa;
