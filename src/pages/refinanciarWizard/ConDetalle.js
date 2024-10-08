import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EntradaMoneda from "../../components/EntradaMoneda";
import YearSelect from "../../components/YearSelect";
import values from "../../utils/values.json";
import FileLoader from "./FileLoader";
import { validarPie, getCurrentDate } from '../../utils/formUtils';

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
  const [showTooltip, setShowTooltip] = useState(false);

  // Verificar si `data` está en formato JSON y parsearlo si es necesario
  const parsedData = typeof data === 'string' ? JSON.parse(data) : data;

  // Recuperar datos de localStorage (si existen)
  const storedFormData = JSON.parse(localStorage.getItem("formData")) || {};

  // Inicializar los valores con los datos que vienen de ContactForm y agregar los campos de crédito
  const [formData, setFormData] = useState({
    id: parsedData.id || storedFormData.id,
    rut: parsedData?.rut || storedFormData?.rut || '',
    phone: parsedData?.phone || storedFormData?.phone || '',
    email: parsedData?.email || storedFormData?.email || '',
    typeFinance: parsedData?.typeFinance || storedFormData?.typeFinance || '',
    workerType: parsedData?.workerType || storedFormData?.workerType || '',
    salary: parsedData?.salary || storedFormData?.salary || 0,
    startWorkingDate: parsedData?.startWorkingDate || storedFormData?.startWorkingDate || '',
    carValue: parsedData?.carValue || storedFormData?.carValue || '',
    footAmount: parsedData?.footAmount || storedFormData?.footAmount || '',
    fee: parsedData?.fee || storedFormData?.fee || '',
    caryear: parsedData?.caryear || storedFormData?.caryear || ''
  });

  // Cargar los datos almacenados cuando el componente se monte
  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("formData"));
    if (storedFormData) {
      setFormData(storedFormData);
      setSelectedYear(storedFormData.caryear || '');
    }
  }, []);

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
    setFormData((prevData) => ({ ...prevData, anno: year }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTooltipClick = () => {
    setShowTooltip(!showTooltip);
  };

  const handleLoadFile = (file) => {
    const fileSize = file.size;
    const maxSize = 1024 * 1024 * 3; // 3MB
    if (fileSize > maxSize) {
      setError(`File is too large. Maximum size is ${maxSize / 1024 / 1024}MB`);
      setLoadedFile(null);
    } else {
      setLoadedFile(file);
      setError(null);
    }
  };

  const validateForm = () => {
    // Validar el valor aproximado del vehículo
    const carValue = parseFloat(
        String(formData.carValue).replace(/\D/g, '')
    );
    if (!carValue || carValue <= 0) {
      return "Por favor, ingresa un valor válido para el vehículo.";
    }

    // Validar el monto del pie
    const footAmount = parseFloat(
        String(formData.footAmount).replace(/\D/g, '')
    );
    if (!validarPie(footAmount, carValue)) {
      const minFootAmount = carValue * 0.20;
      return `El monto del pie debe ser al menos el 20% del valor del vehículo (${minFootAmount.toLocaleString()}).`;
    }

    // Validar el número de cuotas
    const validFees = [6, 12, 18, 24, 30, 36, 42, 48];
    if (!formData.fee || !validFees.includes(parseInt(formData.fee))) {
      return "Por favor, selecciona un número de cuotas válido (6, 12, 18, 24, 30, 36, 42, 48).";
    }

    // Validar el año del vehículo
    const currentYear = parseInt(getCurrentDate().slice(0, 4));
    if (!formData.caryear || formData.caryear < 2000 || formData.caryear > currentYear) {
      return `Por favor, selecciona un año del vehículo válido entre 2000 y ${currentYear}.`;
    }

    return null; // Sin errores
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
          body: JSON.stringify(formData),
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
              value={formData.valor || ""}
              onChange={handleInputChange}
              placeholder="$8.888.888"
              className="form-input-column"
            />
            <span
              className="tooltip-trigger"
              onClick={() => handleTooltipClick()}
              style={{
                cursor: "pointer",
                backgroundColor: "#1C4F97",
                padding: "5px",
                borderRadius: "50%",
                fontSize: "12px",
                textAlign: "center",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "20px",
                height: "20px",
              }}
            >
              i
            </span>
          </div>
        </div>

        {showTooltip && (
          <div
            className="popup"
            style={{
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              marginTop: "10px",
              zIndex: 2,
            }}
          >
            <div className="popup-header">
              <h1
                style={{
                  color: "#2e4e9c",
                  textDecoration: "underline",
                  margin: 0,
                }}
              >
                Monto de la deuda
              </h1>
              <a
                href="#"
                style={{
                  color: "#2e4e9c",
                  /* textDecoration: "underline", */
                  cursor: "pointer",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
                onClick={(event) => {
                  event.preventDefault(); // Evitar comportamiento predeterminado del enlace
                  handleTooltipClick(); // Llamar a la función que muestra el popup
                }}
              >
                X Cerrar
              </a>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a
              nisl ac enim semper congue nec non mi. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia curae;
              Quisque venenatis ornare lacus eget laoreet. Aenean in facilisis
              dui. Duis a ipsum enim. Aliquam purus diam, lacinia ac ornare in,
              sollicitudin non felis. Duis quis magna vestibulum dui laoreet
              rhoncus. Sed et rhoncus elit. Pellentesque auctor eget felis
              euismod sollicitudin.
            </p>
          </div>
        )}

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



        </div>
        <div className="vehiculo-container">
        <div class="formControl-root">
            <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
              Cuotas totales*
            </label>
            <div className="outlinedInput-root textField-root inputBase-root">
              <input type="text" className="form-input-column"></input>
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
