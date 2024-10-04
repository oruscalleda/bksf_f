import React from 'react';
import logo from '../img/logo.png'

const Exito = ({ steps, currentStep, onChange }) => {
  return (
    <div>
      <img src={logo} alt="Logo" style={{ marginRight: '10px', width: '150px' }} />
      <div className="checkmark-circle">
        <svg width="110" height="110" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <h1>¡Felicidades, hemos recibido tu solicitud!</h1>
      <p>Hemos enviado la documentación a tu correo electrónico</p>
    </div>
  );
};

export default Exito