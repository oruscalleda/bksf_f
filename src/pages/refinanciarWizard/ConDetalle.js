import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EntradaMoneda from "../../components/EntradaMoneda";
import YearSelect from "../../components/YearSelect";
import values from "../../utils/values.json";
import FileLoader from "./FileLoader";

import { ReactComponent as CheckMarkIcon } from "../../img/check-mark.svg";
import { ReactComponent as TrashIcon } from "../../img/trash.svg";

const ConDetalle = ({
  steps,
  currentStep,
  onChange,
  onNextStep,
  onBack,
  data,
}) => {
  const formRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadedFile, setLoadedFile] = useState(null);

  const [selectedYear, setSelectedYear] = useState(""); // Estado para el año seleccionado
  const [formValues, setFormValues] = useState({
    entidad: "",
    valor: "",
    cuotasPagadas: "",
    cuotasTotales: "",
    marca: "",
    modelo: "",
    anno: "",
  });

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

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setFormValues((prevData) => ({ ...prevData, anno: year }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoadFile = (file) => {
    setLoadedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://cert-sacr-bice.indexa.cl/api/integracioncreditos/crediauto/inyectar",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            Authorization:
              "/BiDDlxZFEm4Jqr8V/5ru8sB7J+wSkHi6mwjoj9F/KthTA37xkhK+Q==",
          },
          body: JSON.stringify(formValues),
          mode: "cors",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }

      const data = await response.json();
      handleNextStep(); // Navegar al siguiente paso
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextStep = () => {
    navigate("/ValidarConAgente", { state: { currentStep: 3 } });
  };

  const handlePreviousStep = () => {
    onBack();
  };
  return (
    <div className="info-credito">
      <h1>Información del crédito</h1>
      <p>Completa los datos de tu crédito</p>
      <form className="form-container">
        <div class="formControl-root">
          <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
            Entidad financiera*
          </label>
          <div className="outlinedInput-root textField-root inputBase-root">
            <select
              onChange={handleInputChange}
              name="entidad"
              className="form-input-column"
              style={{ width: "calc(100% - 16px)" }}
            >
              {values.institucion.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div class="formControl-root">
          <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
            Monto de la deuda*
          </label>
          <div className="outlinedInput-root textField-root inputBase-root">
            <EntradaMoneda
              id="valor"
              name="valor"
              type="text"
              value={formValues.valor || ""}
              onChange={handleInputChange}
              placeholder="$8.888.888"
              className="form-input-column"
            />
          </div>
        </div>
        <div className="cuotas-container">
          <div class="formControl-root">
            <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
              Cuotas pagadas*
            </label>
            <div className="outlinedInput-root textField-root inputBase-root">
              <input type="text" className="form-input-column"></input>
            </div>
          </div>
          <div class="formControl-root">
            <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
              Cuotas totales*
            </label>
            <div className="outlinedInput-root textField-root inputBase-root">
              <input type="text" className="form-input-column"></input>
            </div>
          </div>
        </div>
        <div className="vehiculo-container">
          <div class="formControl-root">
            <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
              Marca*
            </label>
            <div className="outlinedInput-root textField-root inputBase-root">
              <input
                type="text"
                id="marca"
                name="marca"
                className="form-input-column"
              ></input>
            </div>
          </div>
          <div class="formControl-root">
            <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
              Modelo*
            </label>
            <div className="outlinedInput-root textField-root inputBase-root">
              <input
                type="text"
                id="modelo"
                name="modelo"
                className="form-input-column"
              ></input>
            </div>
          </div>
        </div>
        <div className="vehiculo-year-container">
          <div class="formControl-root">
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
        <FileLoader handleLoadFile={handleLoadFile} />
        {loadedFile ? (
          <div className="loaded-document">
            <CheckMarkIcon fill="#004e9c" width="30" height="30" />
            {loadedFile.name}
            <TrashIcon
              style={{ cursor: "pointer" }}
              onClick={() => setLoadedFile(null)}
              width="30"
              height="30"
            />
          </div>
        ) : null}
      </form>

      <div className="navButtonContainer">
        <input
          type="button"
          className="atrasButton"
          value="Atrás"
          onClick={handlePreviousStep}
        />
        <input
          type="button"
          className="continuarButton"
          value="CONTINUAR"
          onClick={handleNextStep}
        />
      </div>
    </div>
  );
};

export default ConDetalle;
