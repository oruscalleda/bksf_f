import React from "react";
//import './ValidarRenta.scss'

const ValidarRenta = ({ steps, currentStep, onChange }) => {
  return (
    <div>
      <h1>Validar renta</h1>
      <p>Para validar tu renta, elige entre las dos opciones</p>

      <div className="card">
        <div className="card-header">
          <p className="card-title">Validar de forma ágil y digital</p>
        </div>
        <div className="card-body">
          <div className="form-container">
            <p className="card-text">
              La información viajara encriptada de extremo a extremo
            </p>
            <p className="card-text">
              Tus datos te pertenecen y serán compartidos solo con Crediautos
            </p>
          </div>
          <div>
            <p className="card-text">
              Acepto los términos y condiciones para brindar acceso a Floid a mi
              información financiera y comparta mi información financiera de
              forma exclusiva con Crediautos.
            </p>
          </div>
          <a href="#" className="btn continuarButton">
            CONTINUAR
          </a>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <p className="card-title">Validar renta con agente</p>
          <p className="card-text">
            Un agentes se pondrá en contacto contigo para validar tu renta
          </p>
          <a href="#" className="btn continuarButton">
            CONTINUAR
          </a>
        </div>
      </div>
    </div>
  );
};

export default ValidarRenta;
