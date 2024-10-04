import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EntradaMoneda from "../../components/EntradaMoneda";
import values from "../../utils/values.json";
import { formatRUT, formatPhone, getCurrentDate } from "../../utils/formUtils";
import { saveToLocalStorage } from "../../services/storageService";
import { postClientData } from "../../services/apiService";

const ContactForm = ({ onNextStep }) => {
  const formRef = useRef(null);
  const navigate = useNavigate();

  // Estado del formulario
  const [formData, setFormData] = useState({
    rut: "",
    telefono: "+56 9",
    correo: "",
    empleo: "",
    renta: "",
    fechaIngLab: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Almacenar los datos en localStorage cuando cambien
  useEffect(() => {
    saveToLocalStorage("formData", formData);
  }, [formData]);

  // Manejar los cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const formattedValue =
      name === "rut"
        ? formatRUT(value)
        : name === "telefono"
        ? formatPhone(value)
        : value;
    setFormData((prevData) => ({ ...prevData, [name]: formattedValue }));
  };

  // Enviar datos del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    // Preparar los datos para enviarlos
    const submittedData = {
      rut: formData.rut,
      phone: formData.telefono,
      typeFinance: "FINANCIAMIENTO",
      email: formData.correo,
      workerType: formData.empleo,
      salary: parseInt(formData.renta.replace(/\D/g, "")),
      startWorkingDate: formData.fechaIngLab,
    };

    try {
      //const response = await postClientData(submittedData);  // Llamar al servicio de API real
      const response = {
        id: 1,
        rut: "23.454.654-6",
        phone: "879846546",
        typeFinance: "FINANCIAMIENTO",
        email: "email@mail.com",
        workerType: "conGiro",
        salary: 11155,
        startWorkingDate: "01/01/1990",
      };

      // Verificar que la respuesta tenga el id (suponiendo que está en response.id)
      if (response && response.id) {
        // Guardar el formData actualizado en el localStorage
        localStorage.setItem("formData", JSON.stringify(response));
        onNextStep(response);
      } else {
        throw new Error("ID no encontrado en la respuesta de la API");
      }
    } catch (error) {
      // Manejar errores en la API
      setError(error.message);
      console.error("Error al enviar los datos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Título y subtítulo */}
      <h1 style={{ fontSize: "18px", fontWeight: "bold", color: "#004E9C" }}>
        Información de contacto
      </h1>
      <p style={{ fontSize: "14px" }}>
        Completa tus datos para poder contactarte correctamente
      </p>

      <form ref={formRef} onSubmit={handleSubmit} className="mui-form">
        {/* Campo de RUT */}
        <div className="formControl-root">
          <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
            RUT*
          </label>
          <div className="outlinedInput-root textField-root inputBase-root">
            <input
              name="rut"
              placeholder="Ej: 11.11.11.111-1"
              type="text"
              className="form-input"
              value={formData.rut}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Campo de Teléfono */}
        <div className="formControl-root">
          <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
            Teléfono*
          </label>
          <div className="outlinedInput-root textField-root inputBase-root">
            <input
              type="tel"
              name="telefono"
              placeholder="+56 9 999 999 99"
              className="form-input"
              value={formData.telefono}
              onChange={handleInputChange}
              maxLength="17" // Limitar longitud para el formato de teléfono
              required
            />
          </div>
        </div>

        {/* Campo de Correo Electrónico */}
        <div className="formControl-root">
          <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
            Correo Electrónico*
          </label>
          <div className="outlinedInput-root textField-root inputBase-root">
            <input
              type="email"
              name="correo"
              placeholder="Ej: correo@mail.com"
              className="form-input"
              value={formData.correo}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Campo de Tipo de Empleo */}
        <div className="formControl-root">
          <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
            Tipo de empleo*
          </label>
          <div className="outlinedInput-root textField-root inputBase-root">
            <select
              name="empleo"
              className="form-input"
              value={formData.empleo}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled hidden>
                Seleccionar
              </option>
              {values.ocupacion.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Campo de Renta Líquida */}
        <div className="formControl-root">
          <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
            Renta líquida*
          </label>
          <div className="outlinedInput-root textField-root inputBase-root">
            <EntradaMoneda
              name="renta"
              placeholder="Ej: 900.000"
              className="form-input"
              value={formData.renta}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Campo de Fecha de Ingreso Laboral */}
        <div className="formControl-root">
          <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
            Fecha de ingreso laboral*
          </label>
          <div className="outlinedInput-root textField-root inputBase-root">
            <input
              type="date"
              name="fechaIngLab"
              className="form-input"
              value={formData.fechaIngLab}
              onChange={handleInputChange}
              max={getCurrentDate()}
              required
            />
          </div>
        </div>

        {/* Botones de navegación */}
        <div className="navButtonContainer">
          <button
            disabled={isLoading}
            className="atrasButton"
            onClick={() => navigate(-1)}
          >
            Atrás
          </button>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button
            type="submit"
            disabled={isLoading}
            className="continuarButton"
          >
            {isLoading ? "Cargando..." : "CONTINUAR"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
