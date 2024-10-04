import React from 'react';

const CompartirInfo = ({ steps, currentStep, onChange }) => {
  return (
    <div>
        <h2>Copmarte tu información SII Empresas con BK SPA usando tu Clave Tributaria</h2>
        <p>La información viaja encriptada de extremo a extremo</p>
        <p>Tus datos te perteneces y serán comparitdos sólo con BK SPA</p>
        <input type="button">Comenzar</input>
    </div>
  );
};

export default CompartirInfo