import React, { useState, useEffect } from "react";
import EntradaMoneda from "../../components/EntradaMoneda";
import simulacionData from "../../utils/simulacion.json"; // Import the JSON data
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate

import { isMobile } from "react-device-detect";
import { ReactComponent as CalendarIcon } from "../../img/calendar-days.svg";
import { ReactComponent as PercentageIcon } from "../../img/percentage.svg";
import { ReactComponent as PieChartIcon } from "../../img/pie-chart.svg";
import { ReactComponent as CoinsIcon } from "../../img/coins-stacked.svg";
import { ReactComponent as CarIcon } from "../../img/car-black.svg";

const Card = ({ option, handlePopupClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showCostoTooltip, setShowCostoTooltip] = useState(false);
  const [showValorTooltip, setShowValorTooltip] = useState(false);
  const [showCAETooltip, setShowCAETooltip] = useState(false);

  const navigate = useNavigate();

  const handleTooltipClick = () => {
    setShowTooltip(!showTooltip);
  };
  // const handleCostoTooltipClick = () => {
  //   setShowCostoTooltip(!showCostoTooltip);
  // };

  // const handleValorTooltipClick = () => {
  //   setShowValorTooltip(!showValorTooltip);
  // };

  // const handleCAETooltipClick = () => {
  //   setShowCAETooltip(!showCAETooltip);
  // };

  // Función para navegar a la pantalla de éxito
  const handleLoQuieroClick = () => {
    navigate("/ValidarConAgente"); // Navega a la ruta de éxito
  };

  return (
    <div
      className="card tipo-seleccion"
      style={{
        borderRadius: "10px",
        backgroundColor: "#F0F4F9",
        marginBottom: "20px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        className="card-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#c8e5ff",
          borderRadius: "10px 10px 0 0",
          color: "#FFFFFF",
        }}
      >
        <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "#2e4e9c" }}>
          {option.titulo}
        </h2>
        <p className="mas-info">
          <a
            onClick={(event) => {
              event.preventDefault(); // Evitar comportamiento predeterminado del enlace
              handlePopupClick(); // Llamar a la función que muestra el popup
            }}
          >
            Más información
          </a>
        </p>
      </div>

      <div
        className="card-body"
        style={{ padding: "20px", borderRadius: "0 0 10px 10px" }}
      >
        <div
          className="card-content"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "14px",
                color: "#000",
                margin: 0,
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Valor cuota
            </p>
            <h3
              className="cuota"
              style={{
                marginTop: "7px",
                fontSize: "32px",
                color: "#CC0610",
                fontWeight: "bold",
              }}
            >
              {option.valorCuota.toLocaleString("es-ES")}
            </h3>
          </div>
          {!isMobile ? (
            <div>
              <p style={{ fontSize: "14px", color: "#000", margin: 0 }}>
                CAE (Costo Anual Equivalente)
              </p>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#004E9C",
                  textAlign: "left",
                }}
              >
                {option.cae.toLocaleString("es-ES")}
              </p>
            </div>
          ) : null}
        </div>
        {isMobile ? (
          <div>
            <p style={{ fontSize: "14px", color: "#000", margin: 0 }}>
              CAE (Costo Anual Equivalente)
            </p>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#004E9C",
                textAlign: "left",
              }}
            >
              {option.cae.toLocaleString("es-ES")}
            </p>
          </div>
        ) : null}
        <div
          className="card-content"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <div>
            <p style={{ fontSize: "14px", color: "#000", margin: 0 }}>
              Costo total del crédito
            </p>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#004E9C",
                textAlign: "left",
              }}
            >
              {option.total.toLocaleString("es-ES")}
            </p>
          </div>
          {option.cuoton ? (
            <div
              className="cuoton"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginRight: "62px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <p
                  style={
                    !isMobile
                      ? {
                          fontSize: "14px",
                          color: "#000",
                          fontWeight: "bold",
                          marginRight: "10px",
                        }
                      : {
                          fontSize: "14px",
                          color: "#000",
                          fontWeight: "bold",
                        }
                  }
                >
                  Cuotón (VFMG)
                </p>
                <span
                  className="tooltip-trigger"
                  onClick={handleTooltipClick}
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
                    width: "23px",
                    height: "23px",
                  }}
                >
                  ?
                </span>
              </div>
              {showTooltip && (
                <div
                  className="popup"
                  style={{ borderRadius: "20px", padding: "10px" }}
                >
                  <div
                    className="popup-header"
                    style={{ marginBottom: "10px" }}
                  >
                    <h1 style={{ color: "#2e4e9c" }}>
                      <strong>CREDITO INTELIGENTE</strong>
                    </h1>
                    <a
                      style={{ color: "#2e4e9c" }}
                      onClick={(event) => {
                        event.preventDefault();
                        handleTooltipClick();
                      }}
                    >
                      <strong>Cerrar X</strong>
                    </a>
                  </div>
                  Al financiar un vehículo con el crédito automotriz
                  inteligente, también tienes la opción de quedarte con él
                  después de haber pagado todas las cuotas. Para hacerlo, tienes
                  que pagar un cuotón que equivale al 50% o 40% del valor total
                  del auto cuando estaba nuevo.
                </div>
              )}
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#CC0610",
                  marginTop: "-12px",
                  textAlign: "left",
                }}
              >
                {option.cuoton.toLocaleString("es-ES")}
              </p>
            </div>
          ) : null}
        </div>
        <div className="continue-button" style={{ textAlign: "right" }}>
          <button
            onClick={handleLoQuieroClick}
            style={{
              padding: "10px 20px",
              backgroundColor: "#004E9C",
              color: "#FFFFFF",
              border: "none",
              cursor: "pointer", // Asegura que esté este estilo
              fontWeight: "bold",
            }}
          >
            LO QUIERO
          </button>
        </div>
      </div>
    </div>
  );
};

const Simulacion = ({ onNextStep, onPreviousStep }) => {
  // Recuperar los datos de formData de localStorage
  const existingData = JSON.parse(localStorage.getItem("formData")) || {};

  const [dataS, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Manejar el popup
  const handlePopupClick = () => {
    setShowPopup(!showPopup);
  };

  // Función para cargar la simulación (en este caso cargamos desde un archivo JSON)
  const handleCalculate = async () => {
    setData(simulacionData); // Establecer los datos desde el JSON
    setShowOptions(true);
  };

  // Efecto para cargar los datos de simulación cuando el componente se monta
  useEffect(() => {
    handleCalculate();
  }, []);

  // Si está cargando, mostramos un mensaje de carga
  if (loading) {
    return <div>Loading...</div>;
  }

  // Si hay un error, lo mostramos
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="simulacion-container">
      <h1>Resultados de simulación</h1>
      <p>Te ofrecemos distintas alternativas según el monto solicitado</p>
      <div className="form-row">
        <div className="formControl-root simulacionRow">
          <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
            Valor aproximado del vehículo*
          </label>
          <div
            className="outlinedInput-root textField-root inputBase-root"
            style={!isMobile ? { width: "50%" } : { width: "100%" }}
          >
            <EntradaMoneda
              value={existingData.carValue}
              name="valor"
              placeholder="$30.000.000"
              className="form-input"
              disabled={true}
            />
          </div>
          {!isMobile ? (
            <div
              className="formControl-root simulacionRow cuotas"
              style={{ margin: 0, width: "50%" }} //isMobile ?
            >
              <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
                Número de cuotas*
              </label>
              <div className="outlinedInput-root textField-root inputBase-root">
                <select
                  name="cuotas"
                  className="form-input-column cuotas"
                  value={existingData.fee || ""}
                >
                  {[6, 12, 18, 24, 30, 36, 42, 48].map((cuota) => (
                    <option key={cuota} value={cuota}>
                      {cuota}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : null}
        </div>
        <div className="simulacion-cuotas-movil">
          {isMobile ? (
            <div
              className="formControl-root simulacionRow cuotas"
              style={isMobile ? { margin: 0, width: "50%" } : null}
            >
              <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
                Número de cuotas*
              </label>
              <div className="outlinedInput-root textField-root inputBase-root">
                <select
                  name="cuotas"
                  className="form-input-column cuotas"
                  value={existingData.fee || ""}
                >
                  {[6, 12, 18, 24, 30, 36, 42, 48].map((cuota) => (
                    <option key={cuota} value={cuota}>
                      {cuota}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : null}
          <button onClick={handleCalculate} className="recalcular-button">
            RECALCULAR
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-repeat"
              viewBox="0 0 16 16"
            >
              <path d="M11.534 7h-7.07a.5.5 0 0 0 0 1h7.07l-.854.854a.5.5 0 1 0 .708.708l1.75-1.75a.5.5 0 0 0 0-.708l-1.75-1.75a.5.5 0 1 0-.708.708l.854.854zM4.466 9h7.07a.5.5 0 1 0 0-1h-7.07l.854-.854a.5.5 0 1 0-.708-.708l-1.75 1.75a.5.5 0 0 0 0 .708l1.75 1.75a.5.5 0 0 0 .708-.708L4.466 9z" />
            </svg>
          </button>
        </div>

        {showOptions && (
          <div className="options-list">
            {showPopup && (
              <div
                className="popup"
                style={{
                  padding: "20px",
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  marginTop: "10px",
                  zIndex: 1,
                }}
              >
                <div className="popup-header">
                  <h1 style={{ color: "#2e4e9c" }}>
                    <strong>CREDITO INTELIGENTE</strong>
                  </h1>
                  <a
                    style={{ color: "#2e4e9c" }}
                    onClick={(event) => {
                      event.preventDefault();
                      handlePopupClick();
                    }}
                  >
                    <strong>Cerrar X</strong>
                  </a>
                </div>
                <h4 style={{ marginBottom: "15px" }}>
                  <strong>Caracteristicas:</strong>
                </h4>
                <div className="popup-item">
                  <CalendarIcon width="35" height="35" />
                  <p>
                    <strong>Plazo:</strong> 24 + Cuoton o 36 + Cuoton*
                  </p>
                </div>
                <div className="popup-item">
                  <PercentageIcon width="35" height="35" />
                  <p>
                    <strong>Tasa:</strong> Fija mensual
                  </p>
                </div>
                <div className="popup-item">
                  <PieChartIcon width="35" height="35" />
                  <p>
                    <strong>Pie:</strong> Mínimo 20% | Máximo 30%
                  </p>
                </div>
                <div className="popup-item">
                  <CoinsIcon className="coinsIcon" width="35" height="35" />
                  <p>
                    <strong>Financiamiento:</strong> Autos con 2 años de
                    antigüedad máxima
                  </p>
                </div>
                <div className="popup-item">
                  <CarIcon className="carIcon" width="35" height="35" />
                  <p>
                    <strong>Cuotas:</strong> Al final del periodo renueva tu
                    auto o refinancia el cuoton*
                  </p>
                </div>
                <div className="extra-info">
                  <ul>
                    <li>
                      Calculo de simulación realizada automáticamente a 30 días,
                      valores cuota pueden variar al realizar el cálculo de la
                      contratación del crédito automotriz definitivo.
                    </li>
                    <li>
                      Cuota incluye seguro de desgravamen y cesantía, para
                      incluir otros seguros llamar al 600 370 9000.
                    </li>
                    <li>
                      Cuota simulada aplica única y exclusivamente a la
                      contratación de créditos para vehículos particulares.
                    </li>
                    <li>
                      <strong>Crediautos</strong> se reserva el derecho de
                      aprobación en función de las políticas crediticias
                      vigentes y previa comprobación de antecedentes financieros
                      y comerciales del solicitante.
                    </li>
                    <li>
                      Para mayor información sobre nuestros requisitos,
                      revisa&nbsp;
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        Condiciones para Acceder a Créditos
                      </a>
                      .
                    </li>
                  </ul>
                </div>
              </div>
              // <Popup />
            )}
            {dataS.length > 0 ? (
              dataS.map((option) => (
                <Card
                  key={option.id}
                  option={option}
                  handlePopupClick={handlePopupClick}
                />
              ))
            ) : (
              <p>No options available</p>
            )}
            <div className="simulacion-formalizar-info">
              <p>
                Tras confirmar la simulación, un agente se contactará contigo
                para formalizar el contrato.
              </p>
            </div>
          </div>
        )}

        {/* Botones de navegación */}
        <div className="navButtonContainer">
          <button className="atrasButton" onClick={onPreviousStep}>
            Volver a simular
          </button>
        </div>
      </div>
    </div>
  );
};

export default Simulacion;
