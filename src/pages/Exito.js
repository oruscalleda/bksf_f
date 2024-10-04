import React from "react";
import logo from "../img/logo.png";

const Exito = ({ steps, currentStep, onChange }) => {
  return (
    <div className="exito-container">
      <img
        src={logo}
        alt="Logo"
        style={{ marginLeft: "15px", width: "175px" }}
      />
      <div className="exito-content">
        <div className="checkmark-circle">
          <svg
            width="110"
            height="110"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1>
          <strong>Hemos validado tu renta exitosamente</strong>
        </h1>
        <p>
          Un agente se pondrá en contacto contigo para formalizar la propuesta
        </p>
      </div>
    </div>
  );
};

export default Exito;
