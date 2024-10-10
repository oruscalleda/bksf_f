import React from "react";
import logo from "../../assets/public/logo.svg";
import { isMobile } from "react-device-detect";

import "./StepNav.css";

const StepNav = ({ steps, currentStep, totalSteps }) => {
  return (
    <>
      {isMobile ? (
        <>
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
          </div>{" "}
        </>
      ) : (
        <ul className="step-nav">
          <img
            src={logo}
            alt="Logo"
            style={{ marginRight: "10px", width: "150px" }}
          />
          {steps.map((step) => (
            <li
              key={step.id}
              className={step.id === currentStep ? "active" : ""}
            >
              <span
                className={`step-circle ${
                  step.id === currentStep ? "active" : ""
                }`}
              >
                {step.id}
              </span>
              <span className="step-label">{step.label}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default StepNav;
