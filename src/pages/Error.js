import React from 'react';

const Error = ({ steps, currentStep, onChange }) => {
  return (
    <div>
        <h2>¡Felicidades, hemos recibido tu solicitud!</h2>
        <p>Nos encontramos presentando algunos problemas de nuestro lado por lo que no es posible gestionar tu solicitud, 
            por favor inténtalo más tarde o comunícate con nosotros al 600 370 9000.
        </p>
        <p>Nuestros horarios de atención son:
            Lunes a Jueves de 8:30 a 18:00 hrs.
            Viernes de 8:30 a 16:00 hrs.
        </p>
        <input type="button">Ir a inicio</input>
    </div>
  );
};

export default Error