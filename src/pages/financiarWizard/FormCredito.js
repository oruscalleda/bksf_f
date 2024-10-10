import React, { useState, useEffect } from "react";
import EntradaMoneda from "../../components/EntradaMoneda";
import { isMobile } from "react-device-detect";
import { updateClientData } from "../../services/apiService";
import { validarPie, getCurrentDate } from "../../utils/formUtils";

import "./FinanciarWizard.scss";

const FormCredito = ({ onNextStep, onPreviousStep, data }) => {
  // Verificar si `data` está en formato JSON y parsearlo si es necesario
  const parsedData = typeof data === "string" ? JSON.parse(data) : data;

  // Recuperar datos de localStorage (si existen)
  const storedFormData = JSON.parse(localStorage.getItem("formData")) || {};

  // Inicializar los valores con los datos que vienen de ContactForm y agregar los campos de crédito
  const [formData, setFormData] = useState({
    id: parsedData.id || storedFormData.id,
    rut: parsedData?.rut || storedFormData?.rut || "",
    phone: parsedData?.phone || storedFormData?.phone || "",
    email: parsedData?.email || storedFormData?.email || "",
    typeFinance: parsedData?.typeFinance || storedFormData?.typeFinance || "",
    workerType: parsedData?.workerType || storedFormData?.workerType || "",
    salary: parsedData?.salary || storedFormData?.salary || 0,
    startWorkingDate:
      parsedData?.startWorkingDate || storedFormData?.startWorkingDate || "",
    carValue: parsedData?.carValue || storedFormData?.carValue || "",
    footAmount: parsedData?.footAmount || storedFormData?.footAmount || "",
    fee: parsedData?.fee || storedFormData?.fee || "",
    caryear: parsedData?.caryear || storedFormData?.caryear || "",
  });

  const [selectedYear, setSelectedYear] = useState(
    storedFormData?.caryear || ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar los datos almacenados cuando el componente se monte
  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("formData"));
    if (storedFormData) {
      setFormData(storedFormData);
      setSelectedYear(storedFormData.caryear || "");
    }
  }, []);

  // Guardar en localStorage cada vez que formData cambie
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  // Obtener el rango de años
  const getYearRange = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const startYear = currentMonth >= 8 ? currentYear - 7 : currentYear - 8; // Rango desde hace 7 años
    const endYear = currentYear + 1; // Hasta el próximo año
    return Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => endYear - i
    ); // Invertir el orden
  };

  const validateForm = () => {
    // Validar el valor aproximado del vehículo
    const carValue = parseFloat(String(formData.carValue).replace(/\D/g, ""));
    if (!carValue || carValue <= 0) {
      return "Por favor, ingresa un valor válido para el vehículo.";
    }

    // Validar el monto del pie
    const footAmount = parseFloat(
      String(formData.footAmount).replace(/\D/g, "")
    );
    if (!validarPie(footAmount, carValue)) {
      const minFootAmount = carValue * 0.2;
      return `El monto del pie debe ser al menos el 20% del valor del vehículo (${minFootAmount.toLocaleString()}).`;
    }

    // Validar el número de cuotas
    const validFees = [6, 12, 18, 24, 30, 36, 42, 48];
    if (!formData.fee || !validFees.includes(parseInt(formData.fee))) {
      return "Por favor, selecciona un número de cuotas válido (6, 12, 18, 24, 30, 36, 42, 48).";
    }

    // Validar el año del vehículo
    const currentYear = parseInt(getCurrentDate().slice(0, 4));
    if (
      !formData.caryear ||
      formData.caryear < 2000 ||
      formData.caryear > currentYear
    ) {
      return `Por favor, selecciona un año del vehículo válido entre 2000 y ${currentYear}.`;
    }

    return null; // Sin errores
  };

  // Limpiar los valores numéricos que contienen formato de moneda
  const cleanCurrencyValue = (value) => {
    return parseFloat(value.replace(/[^\d,-]/g, "").replace(",", ".")) || 0;
  };

  // Manejar los cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Limpiar los valores de moneda si corresponde
    const parsedValue =
      name === "carValue" || name === "footAmount"
        ? cleanCurrencyValue(value) // Limpiar formato de moneda antes de guardar
        : value;

    setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setFormData((prevData) => ({ ...prevData, caryear: year }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validar el formulario antes de enviar
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    // Actualizar el localStorage con los nuevos valores del formulario de crédito
    const updatedData = {
      ...formData, // Mantener los valores existentes
      carValue: formData.carValue, // Usar el valor limpiado y convertido a número
      footAmount: formData.footAmount, // Usar el monto limpiado y convertido a número
      fee: formData.fee, // Actualizar el número de cuotas
      caryear: formData.caryear,
    };

    try {
      // Aquí deberías hacer la llamada PUT al servicio para actualizar los datos en tu backend
      const response = await updateClientData(updatedData.id, updatedData);

      console.log("datos de vuelta al actualizar en API", response);

      // Pasar los datos actualizados al siguiente paso
      onNextStep(updatedData);
    } catch (error) {
      //setError(error.message);
      console.error("Error actualizando los datos del cliente:", error);
    } finally {
      //  setIsLoading(false);
    }
  };

  return (
    <div className="financiar-wizard-credito-form">
      <h1>Información del crédito a solicitar</h1>
      <p>Para continuar necesitamos conocer la siguiente información</p>
      <form onSubmit={handleSubmit}>
        {/* Valor aproximado del vehículo */}
        <div className="formControl-root">
          <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
            Valor aproximado del vehículo*
          </label>
          <div className="outlinedInput-root textField-root inputBase-root">
            <EntradaMoneda
              id="carValue"
              name="carValue"
              type="text"
              placeholder="Ej: 900.000"
              className="form-input"
              value={formData.carValue} // Vincular el valor con el estado
              onChange={handleInputChange} // Manejar el cambio
              required
            />
          </div>
        </div>

        {/* Monto del pie */}
        <div className="formControl-root">
          <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
            Monto del pie*
          </label>
          <div className="outlinedInput-root textField-root inputBase-root">
            <EntradaMoneda
              type="text"
              name="footAmount"
              placeholder="Ej: 900.000"
              className="form-input"
              value={formData.footAmount} // Vincular el valor con el estado
              onChange={handleInputChange} // Manejar el cambio
              required
            />
          </div>
        </div>

        <div className="credito-input-container">
          {/* Número de cuotas */}
          <div className="formControl-root">
            <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
              Número de cuotas*
            </label>
            <div className="outlinedInput-root textField-root inputBase-root">
              <select
                name="fee"
                className="form-input-column"
                onChange={handleInputChange}
                value={formData.fee || ""}
                required // Vincular el valor con el estado
              >
                {[6, 12, 18, 24, 30, 36, 42, 48].map((cuota) => (
                  <option key={cuota} value={cuota}>
                    {cuota}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Año del vehículo */}
          <div className="formControl-root">
            <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
              Año del vehículo*
            </label>
            <div className="outlinedInput-root textField-root inputBase-root">
              <select
                name="caryear"
                required
                className="form-input-column"
                onChange={(e) => handleYearChange(e.target.value)}
                value={selectedYear} // Vincular el valor con el estado
              >
                <option value="" disabled hidden>
                  Seleccionar año
                </option>
                {getYearRange().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Mostrar mensaje de error si existe */}
        {error && <div className="error-msg">{error}</div>}

        {/* Botones de navegación */}
        <div className="nav-button-container">
          <button className="back-btn" onClick={onPreviousStep}>
            Atrás
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="continue-btn"
            // style={!isMobile ? { width: "60%" } : null}
          >
            SIMULAR
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormCredito;
