import React from 'react';
import { useEffect } from 'react';
import './PanelMapa.css';
import Logo from '../../Componentes/Logo/Logo'; // Importa tu componente Logo
import BtnAux from '../../Componentes/BtnAux/BtnAux'; // Importa tu componente BtnAux
import Mapa from '../../Componentes/Mapa/Mapa'; // Importa tu componente DispositivoCard


const PanelMapa = ({ devices }) => {
  useEffect(() => {
    document.title = 'ARfind - Mapa '; 
  }, []);
  return (
    
    <div className="PanelMapa-page">
      <BtnAux   className={'btnAux'}
                image="/images/home.png" 
                altText="Configuración" 
                link='/'
              />
      <div className="PanelMapa-logo">
        <Logo type="logo" altText="Logo" size="7rem" />
      </div>
        <Mapa></Mapa>
    </div>
  );
};

export default PanelMapa;
