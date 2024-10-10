import React, { useState } from "react";
import StepNav from "../../components/stepnav/StepNav";
import FormContacto from "./FormContacto";
import FormCredito from "./FormCredito";
import Simulacion from "./Simulacion";
// import ValidarRenta from "../ValidarRentaWizard/ValidarRenta";

import "./FinanciarWizard.scss";

const FinanciarWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  // Definición de los pasos del wizard
  const steps = [
    { id: 1, label: "Info de contacto", component: FormContacto },
    { id: 2, label: "Info del crédito", component: FormCredito },
    { id: 3, label: "Simulación", component: Simulacion },
    // { id: 4, label: "Validar renta", component: ValidarRenta },
  ];

  const totalSteps = steps.length;

  // Cambiar el paso actual
  const handleStepChange = (stepId) => {
    setCurrentStep(stepId);
  };

  // Ir al siguiente paso, guardando los datos del formulario si es necesario
  const handleNextStep = (newData) => {
    // Combinar los datos actuales con los nuevos
    setFormData((prevData) => ({
      ...prevData,
      ...newData, // Sobreescribir los datos con los nuevos del paso actual
    }));
    // Avanzar al siguiente paso
    if (currentStep < totalSteps) {
      handleStepChange(currentStep + 1);
    }
  };

  const handlePreviousStep = (newData) => {
    // Guardar datos solo si hay algún nuevo dato relevante
    if (newData) {
      setFormData((prevData) => ({
        ...prevData,
        ...newData,
      }));
    }
    // Retroceder al paso anterior
    if (currentStep > 1) {
      handleStepChange(currentStep - 1);
    }
  };

  // Renderización del componente basado en el paso actual
  const StepComponent = steps.find((step) => step.id === currentStep).component;

  return (
    <div className="financiar-wizard-container">
      {/* Barra de navegación de pasos */}
      <StepNav
        steps={steps}
        currentStep={currentStep}
        totalSteps={totalSteps}
      />

      {/* Contenido del wizard basado en el paso actual */}
      <>
        <StepComponent
          onNextStep={handleNextStep}
          onPreviousStep={handlePreviousStep}
          data={formData}
        />
      </>
    </div>
  );
};

export default FinanciarWizard;
