import React, { useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EntradaMoneda from "../../components/EntradaMoneda";
import YearSelect from "../../components/YearSelect";
import values from "../../utils/values.json";

const SinDetalle = ({ steps, currentStep, onChange, onBack }) => {
  const [formValues, setFormValues] = useState({
    entidad: "",
    montoDeuda: "", // Inicializamos con cadena vacía
    cuotasPagadas: "",
    cuotasTotales: "",
    totalPie: "",
    cuotamensual: "",
    marca: "",
    modelo: "",
    year: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
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
      <p style={{ marginLeft: "10px" }}>Completa los datos de tu crédito</p>
      <form className='form-container'>
        <div class="formControl-root">
          <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
            Selecciona tu institución*
          </label>
          <div className="outlinedInput-root textField-root inputBase-root">
            <select
              name="entidad"
              className="form-input"
              value={formValues.entidad}
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
        <div class="formControl-root">
          <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
            Monto que pagaste por el vehículo*
          </label>
          <div className="outlinedInput-root textField-root inputBase-root">
            <EntradaMoneda
              value={formValues.montoDeuda}
              name="montoDeuda" // Cambié a "montoDeuda" para que coincida con el nombre en el estado
              id="valor"
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
                Cuotas pagadas*
              </label>
              <div className="outlinedInput-root textField-root inputBase-root">
                <input
                  type="text"
                  value={formValues.cuotasPagadas}
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
                  value={formValues.cuotasTotales}
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
            Total del pie*
          </label>
          <div className="outlinedInput-root textField-root inputBase-root">
            <EntradaMoneda
              id="totalPie"
              name="totalPie"
              value={formValues.totalPie}
              onChange={handleInputChange}
              placeholder="$8.888.888"
              className="form-input"
            />
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
              value={formValues.cuotamensual}
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
                  value={formValues.marca}
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
                  value={formValues.modelo}
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
              <YearSelect
                value={formValues.year}
                startYear={1960}
                className="form-input-column"
              />
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
