import React, { useState } from "react";
import EntradaMoneda from "../../components/EntradaMoneda";
import { updateClientData } from "../../services/apiService";
import { isMobile } from "react-device-detect";

const FormCredito = ({ onNextStep, onPreviousStep, data }) => {
  /* TESTING ONLY */
  data = {};
  data.id = 1;
  /* TESTING ONLY */
  const [formData, setFormData] = useState({
    valor: "",
    monto: "",
    cuotas: "",
    anno: "",
    idUsuario: data.id, // Usar los datos recibidos de ContactForm
  });
  const [selectedYear, setSelectedYear] = useState("");
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

  // Manejar los cambios de los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setFormData((prevData) => ({ ...prevData, anno: year }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Obtener los datos actuales de localStorage
    const existingData = JSON.parse(localStorage.getItem("formData"));

    // Actualizar el localStorage con los nuevos valores del formulario de crédito
    const updatedData = {
      ...existingData, // Mantener los valores existentes
      carValue: parseInt(formData.valor.replace(/\D/g, "")), // Convertir el valor del vehículo a número
      footAmount: parseInt(formData.monto.replace(/\D/g, "")), // Convertir el monto del pie a número
      fee: parseInt(formData.cuotas), // Actualizar el número de cuotas
      caryear: formData.anno, // Actualizar el año del vehículo
    };
    // Guardar los datos actualizados en localStorage
    localStorage.setItem("formData", JSON.stringify(updatedData));

    try {
      // Enviar los datos actualizados al servicio PUT
      ///await updateClientData(existingData.id, updatedData);  // Llamar al servicio con el ID y los datos actualizados

      // Pasar al siguiente paso
      onNextStep(updatedData);
    } catch (error) {
      console.error("Error actualizando los datos del cliente:", error);
    }
  };

  return (
    <div>
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
              id="valor"
              name="valor"
              placeholder="Ej: 900.000"
              className="form-input"
              value={formData.valor} // Vincular el valor con el estado
              onChange={handleInputChange} // Manejar el cambio
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
              name="monto"
              placeholder="Ej: 900.000"
              className="form-input"
              value={formData.monto} // Vincular el valor con el estado
              onChange={handleInputChange} // Manejar el cambio
            />
          </div>
        </div>

        <div className="input-container">
          {/* Número de cuotas */}
          <div className="formControl-root">
            <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
              Número de cuotas*
            </label>
            <div className="outlinedInput-root textField-root inputBase-root">
              <select
                name="cuotas"
                className="form-input-column"
                onChange={handleInputChange}
                value={formData.cuotas} // Vincular el valor con el estado
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
                name="anno"
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

        {/* Botones de navegación */}
        <div className="navButtonContainer">
          <button className="atrasButton" onClick={onPreviousStep}>
            Atrás
          </button>
          <button type="submit" style={!isMobile ? { width: "60%" } : null}>
            SIMULAR
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormCredito;
