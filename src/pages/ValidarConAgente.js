import React from "react";
import validarAgente from "../img/validarAgente.png";
// import { ReactComponent as CheckMarkIcon } from "../img/checkmark.svg";

const ValidarConAgente = ({ steps, currentStep, onChange }) => {
  return (
    <>
      <div className="image-container">
        <img src={validarAgente} alt="Atencion al cliente" />
        <div className="checkmark-wrapper">
          <svg
            width="110"
            height="110"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="checkmark-circle"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
      </div>
      <div className="content-container">
        <h2>Gracias por preferirnos</h2>
        <p>Un agente se pondrá en contacto contigo para ayudarte</p>
        <p>
          Horario de atención: Lunes a sábado de 9:00 a 18:00 excepto feriados
        </p>
        <button className="finalize-button">Finalizar</button>
      </div>
    </>
  );
};

export default ValidarConAgente;
