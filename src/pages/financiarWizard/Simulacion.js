import React, { useState, useEffect, useRef } from "react";
import EntradaMoneda from "../../components/EntradaMoneda";
import simulacionData from "../../utils/simulacion.json"; // Import the JSON data
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate

const Card = ({ option }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showCostoTooltip, setShowCostoTooltip] = useState(false);
  const [showValorTooltip, setShowValorTooltip] = useState(false);
  const [showCAETooltip, setShowCAETooltip] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handlePopupClick = () => {
    setShowPopup(!showPopup);
  };
  const handleTooltipClick = () => {
    setShowTooltip(!showTooltip);
  };
  const handleCostoTooltipClick = () => {
    setShowCostoTooltip(!showCostoTooltip);
  };

  const handleValorTooltipClick = () => {
    setShowValorTooltip(!showValorTooltip);
  };

  const handleCAETooltipClick = () => {
    setShowCAETooltip(!showCAETooltip);
  };

  // Función para navegar a la pantalla de éxito
  const handleLoQuieroClick = () => {
    console.log("Botón LO QUIERO presionado");
    navigate("/exito"); // Navega a la ruta de éxito
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
            href="#"
            style={{
              color: "#2e4e9c",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={(event) => {
              event.preventDefault(); // Evitar comportamiento predeterminado del enlace
              handlePopupClick(); // Llamar a la función que muestra el popup
            }}
          >
            Más información
          </a>
        </p>
      </div>
      {showPopup && (
        <div
          className="popup"
          style={{
            padding: "20px",
            backgroundColor: "#f9f9f9",
            border: "1px solid #ccc",
            borderRadius: "10px",
            marginTop: "10px",
          }}
        >
          <h1 style={{ color: "#2e4e9c", textDecoration: "underline" }}>
            CREDITO INTELIGENTE
          </h1>
          <button onClick={handlePopupClick}>Cerrar</button>
          <p>Plazo: 24 + Cuoton o 36 + Cuoton*</p>
          <p>Tasa: Fija mensual</p>
          <p>Pie: Mínimo 20% | Máximo 30%</p>
          <p>Financiamiento: Autos con 2 años de antigüedad máxima</p>
          <p>
            Cuotas: Al final del periodo renueva tu auto o refinancia el cuoton*
          </p>
        </div>
      )}

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
        </div>
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
                  style={{
                    fontSize: "14px",
                    color: "#000",
                    fontWeight: "bold",
                    marginRight: "10px",
                  }}
                >
                  Cuotón (VFMG)
                </p>
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
                  ?
                </span>
              </div>
              {showTooltip && (
                <div
                  className="tooltip"
                  //   style={{
                  //     backgroundColor: "#f9f9f9",
                  //     padding: "10px",
                  //     border: "1px solid #ccc",
                  //     borderRadius: "5px",
                  //     marginTop: "10px",
                  //     position: "absolute",
                  //   }}
                >
                  <p>
                    Al financiar un vehículo con el crédito automotriz
                    inteligente, también tienes la opción de quedarte con él
                    después de haber pagado todas las cuotas. Para hacerlo,
                    tienes que pagar un cuotón que equivale al 50% o 40% del
                    valor total del auto cuando estaba nuevo.
                  </p>
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
  const existingData = JSON.parse(localStorage.getItem("formData"));
  const [dataS, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleCalculate = async () => {
    setData(simulacionData); // Set the data from the imported JSON file
    setShowOptions(true);
  };

  useEffect(() => {
    handleCalculate();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Resultados de simulación</h1>
      <p>Te ofrecemos distintas alternativas según el monto solicitado</p>
      <div className="form-row">
        <div className="formControl-root simulacionRow">
          <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
            Valor aproximado del vehículo*
          </label>
          <div className="outlinedInput-root textField-root inputBase-root">
            <EntradaMoneda
              value={existingData.carValue}
              name="valor"
              placeholder="$30.000.000"
              className="form-input"
              disabled={true}
            />
          </div>
        </div>
        <div className="formControl-root simulacionRow cuotas">
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
      </div>

      <button
        style={{ marginLeft: "7px", marginTop: "12px" }}
        onClick={handleCalculate}
        className="recalcular-button"
      >
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

      {showOptions && (
        <div className="options-list">
          {dataS.length > 0 ? (
            dataS.map((option) => <Card key={option.id} option={option} />)
          ) : (
            <p>No options available</p>
          )}
        </div>
      )}

      <div>
        <p>
          Tras confirmar la simulación, un agente se contactará contigo para
          formalizar el contrato.
        </p>
      </div>
      {/* Botones de navegación */}
      <div className="navButtonContainer">
        <button className="atrasButton" onClick={onPreviousStep}>
          Volver a simular
        </button>
      </div>
    </div>
  );
};

export default Simulacion;
