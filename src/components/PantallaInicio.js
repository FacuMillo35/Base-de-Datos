// PantallaInicio.js
import React, { useState } from 'react';

const PantallaInicio = ({ onStart }) => {
  return (
    <div className="pantalla-inicio">
      <h1 className="titulo-inicio">🔥 Gamer Store 🔥</h1>
      <p className="texto-inicio">Presioná para ingresar</p>
      <button className="boton-inicio" onClick={onStart}>
        START
      </button>
    </div>
  );
};

export default PantallaInicio;
