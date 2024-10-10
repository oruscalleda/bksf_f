import React, { useState } from "react";
import StepNav from "../../components/stepnav/StepNav";
import FormContacto from "./FormContacto";
import ValidarRenta from "../ValidarRentaWizard/ValidarRenta";
import InfoCredito from "./InformacionCredito";
import logo from "../../img/logo.png";

const RefinanciarWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentScreen, setCurrentScreen] = useState("default"); // Estado para las subpantallas dentro de cada paso
  const [formData, setFormData] = useState({});

  const steps = [
    { id: 1, label: "Info de contacto", component: FormContacto },
    { id: 2, label: "Info del crédito", component: InfoCredito },
    { id: 3, label: "Validar renta", component: ValidarRenta },
  ];

  const totalSteps = steps.length;

  // Cambiar el paso actual
  const handleStepChange = (stepId) => {
    setCurrentStep(stepId);
    setCurrentScreen("default"); // Resetear la pantalla cuando se cambie de paso
  };

  const handlePreviousStep = (data) => {
    handleStepChange(currentStep - 1);
  };

  // Ir al siguiente paso, guardando los datos del formulario si es necesario
  const handleNextStep = (data) => {
    if (currentStep === 1) {
      // Guardar los datos del formulario de contacto antes de pasar al paso 2
      setFormData(data);
    }
    handleStepChange(currentStep + 1);
  };

  // Cambiar la pantalla dentro de un paso
  const handleScreenChange = (screen) => {
    setCurrentScreen(screen);
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
            onScreenChange: handleScreenChange, // Pasar la función para cambiar la subpantalla
            data: formData, // Pasar los datos al siguiente formulario
          }
        )}
      </div>
    </div>
  );
};

export default RefinanciarWizard;
