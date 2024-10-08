import React, { useState, useRef, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EntradaMoneda from "../../components/EntradaMoneda";
import YearSelect from "../../components/YearSelect";
import values from "../../utils/values.json";

const SinDetalle = ({ onNextStep, onPreviousStep, data, onBack }) => {

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

  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");

  // Cargar los datos almacenados cuando el componente se monte
  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("formData"));
    if (storedFormData) {
      setFormData(storedFormData);
      setSelectedYear(storedFormData.caryear || '');
    }
  }, []);

  // Limpiar los valores numéricos que contienen formato de moneda
  const cleanCurrencyValue = (value) => {
    return parseFloat(value.replace(/[^\d,-]/g, '').replace(',', '.')) || 0;
  };

  // Manejar los cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Limpiar los valores de moneda si corresponde
    const parsedValue = (name === 'carValue' || name === 'footAmount')
      ? cleanCurrencyValue(value) // Limpiar formato de moneda antes de guardar
      : value;

    setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
  };

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
    setFormData((prevData) => ({ ...prevData, caryear: year }));
  };

  const handleTooltipClick = () => {
    setShowTooltip(!showTooltip);
  };

  const handleNextStep = () => {
    navigate("/ValidarConAgente", { state: { currentStep: 3 } });
  };
  const handlePreviousStep = () => {
    onBack();
  };
  return (
    <div style={{ width: "100%" }}>
      <h1 style={{ marginLeft: "10px" }}>Información del crédito</h1>
      <p style={{ marginLeft: "10px" }}>
        Para continuar con tu solicitud necesitamos info de tu crédito
      </p>
      <form>
        <div class="formControl-root">
          <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
            Selecciona tu institución*
          </label>
          <div className="outlinedInput-root textField-root inputBase-root">
            <select
              name="entidad"
              className="form-input"
              value={formData.entidad}
              onChange={handleInputChange}
            >
              {values.institucion.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div
          class="formControl-root"
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
            Monto que pagaste por el vehículo*
          </label>
          <div className="outlinedInput-root textField-root inputBase-root">
            <EntradaMoneda
              value={formData.montoDeuda}
              name="montoDeuda" // Cambié a "montoDeuda" para que coincida con el nombre en el estado
              id="valor"
              onChange={handleInputChange}
              placeholder="$8.888.888"
              className="form-input-column"
            />
          </div>
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

<div class="formControl-root">
          <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
            Total del pie*
          </label>
          <div className="outlinedInput-root textField-root inputBase-root">
            <EntradaMoneda
              id="totalPie"
              name="totalPie"
              value={formData.totalPie}
              onChange={handleInputChange}
              placeholder="$8.888.888"
              className="form-input"
            />
          </div>
        </div>
        <div className="cuotas-container" style={{ flexDirection: "row" }}>
          <div className="form-container" style={{ alignContent: "initial" }}>
            <div class="formControl-root">
              <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
                Cuotas pagadas*
              </label>
              <div className="outlinedInput-root textField-root inputBase-root">
                <input
                  type="text"
                  value={formData.cuotasPagadas}
                  onChange={handleInputChange}
                  name="cuotasPagadas"
                  id="cuotasPagadas"
                  className="form-input-column"
                  style={{ margin: "8px 0px 0px 0px" }}
                ></input>
              </div>
            </div>
            <div class="formControl-root">
              <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
                Cuotas totales*
              </label>
              <div className="outlinedInput-root textField-root inputBase-root">
                <input
                  step="1"
                  value={formData.cuotasTotales}
                  onChange={handleInputChange}
                  type="text"
                  name="cuotasTotales"
                  id="cuotasTotales"
                  className="form-input-column"
                  style={{ margin: "8px 0px 0px 0px" }}
                ></input>
              </div>
            </div>
          </div>
        </div>

        <div class="formControl-root">
          <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
            Valor cuota mensual*
          </label>
          <div className="outlinedInput-root textField-root inputBase-root">
            <EntradaMoneda
              id="cuotamensual"
              name="cuotamensual"
              value={formData.cuotamensual}
              onChange={handleInputChange}
              placeholder="$8.888.888"
              className="form-input"
            />
          </div>
        </div>
        <div className="cuotas-container">
          <div className="form-container" style={{ alignContent: "initial" }}>
            <div class="formControl-root">
              <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
                Marca*
              </label>
              <div className="outlinedInput-root textField-root inputBase-root">
                <input
                  type="text"
                  value={formData.marca}
                  onChange={handleInputChange}
                  id="marca"
                  name="marca"
                  className="form-input-column"
                  style={{ margin: "8px 0px 0px 0px" }}
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
                  value={formData.modelo}
                  onChange={handleInputChange}
                  name="modelo"
                  className="form-input-column"
                  style={{ margin: "8px 0px 0px 0px" }}
                ></input>
              </div>
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

export default SinDetalle;
