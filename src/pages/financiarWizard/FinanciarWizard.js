import React, { useState } from "react";

import logo from "../../img/logo.png";

import StepNav from "../StepNav";
import FormContacto from "./FormContacto";
import FormCredito from "./FormCredito";
import Simulacion from "./Simulacion";
import ValidarRenta from "../ValidarRenta/ValidarRenta";

const FinanciarWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({}); // Almacena los datos del formulario ContactForm

  const steps = [
    { id: 1, label: "Info de contacto", component: FormContacto },
    { id: 2, label: "Info del crédito", component: FormCredito },
    { id: 3, label: "Simulación", component: Simulacion },
    // { id: 4, label: 'Validar renta', component: ValidarRenta },
  ];

  const totalSteps = steps.length;

  // Cambiar el paso actual
  const handleStepChange = (stepId) => {
    setCurrentStep(stepId);
  };

  // Ir al siguiente paso, guardando los datos del formulario si es necesario
  const handleNextStep = (data) => {
    if (currentStep === 1) {
      // Guardar los datos del formulario de contacto antes de pasar al paso 2
      setFormData(data);
    }
    handleStepChange(currentStep + 1);
  };

  const handlePreviousStep = () => {
    handleStepChange(currentStep - 1);
  };

  return (
    <div className="wizard-container">
      <div className="stepNav-mobile">
        <img
          src={logo}
          alt="Logo"
          style={{ marginRight: "10px", width: "150px" }}
        />
        <span>
          Paso {currentStep} de {totalSteps}
        </span>
      </div>
      <div className="step-indicator">
        <div className="gray-bar" />
        <div
          className="blue-bar"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      <StepNav steps={steps} currentStep={currentStep} />
      <div className="wizard-content">
        {React.createElement(
          steps.find((step) => step.id === currentStep).component,
          {
            onNextStep: handleNextStep, // Pasar la función para avanzar al siguiente paso
            onPreviousStep: handlePreviousStep, // Pasar la función para retroceder al paso anterior
            data: formData, // Pasar los datos al siguiente formulario
          }
        )}
      </div>
    </div>
  );
};

export default FinanciarWizard;
