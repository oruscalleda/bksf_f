import React from 'react';
import logo from '../img/logo.png'

const StepNav = ({ steps, currentStep, onChange }) => {
  return (
    
    <ul className="step-nav">
      <img src={logo} alt="Logo" style={{ marginRight: '10px', width:'150px'}} />
      {steps.map((step) => (
        <li key={step.id} className={step.id === currentStep? 'active' : ''}>
          <span
            className={`step-circle ${step.id === currentStep? 'active' : ''}`}
          >
            {step.id}
          </span>
          <span className="step-label">{step.label}</span>
        </li>
      ))}
    </ul>
  );
};

export default StepNav;