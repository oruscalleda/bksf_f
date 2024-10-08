import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EntradaMoneda from "../../components/EntradaMoneda";
import values from "../../utils/values.json";
import { formatRUT, formatPhone, getCurrentDate, isValidRUT } from "../../utils/formUtils";
import { saveToLocalStorage } from "../../services/storageService";
import { postClientData } from "../../services/apiService";

const ContactForm = ({ onNextStep, data }) => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  // Inicializar formData con los valores de data si es que existen
  const [formData, setFormData] = useState({
    rut: data?.rut || "",
    phone: data?.phone || "+56 9",
    email: data?.email || "",
    workerType: data?.workerType || "",
    salary: data?.salary || "",
    startWorkingDate: data?.startWorkingDate || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    saveToLocalStorage("formData", formData);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Formatear los valores correspondientes
    const formattedValue =
      name === "rut"
        ? formatRUT(value)
        : name === "phone"
          ? formatPhone(value)
          : name === "salary" // Si es el campo salary, asegúrate de que sea numérico
            ? value.replace(/\D/g, '') // Deja solo números
            : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedValue
    }));
  };

  // Validar campos obligatorios
  const validateForm = () => {
    if (!formData.rut || !isValidRUT(formData.rut)) {
      return "Por favor, ingresa un RUT válido.";
    }
    if (!formData.phone) {
      return "Por favor, ingresa un número de teléfono válido.";
    }
    if (!formData.email) {
      return "Por favor, ingresa un correo electrónico válido.";
    }
    if (!formData.workerType) {
      return "Por favor, selecciona un tipo de empleo.";
    }



    if (!formData.salary) {
      return "Por favor, ingresa tu renta líquida.";
    }

    // Verificar si salary es una cadena antes de usar replace
    const salaryValue = parseFloat(
      String(formData.salary).replace(/\D/g, '')  // Convertir a cadena y eliminar caracteres no numéricos
    );
    if (salaryValue < 600000) {  // Verificar el valor mínimo
      return "La renta mínima debe ser al menos $600.000.";
    }



    if (!formData.startWorkingDate) {
      return "Por favor, ingresa la fecha de ingreso laboral.";
    }
    return null; // Sin errores
  };

  // Enviar datos del formulario
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

    // Verificar si salary es una cadena antes de usar replace
    const salaryAsString = typeof formData.salary === 'string'
      ? formData.salary.replace(/\D/g, '')  // Si es cadena, usar replace para eliminar caracteres no numéricos
      : formData.salary;  // Si ya es un número, dejarlo tal cual

    // Preparar los datos para enviarlos
    const submittedData = {
      ...formData,  // Incluir los datos actuales del formulario
      typeFinance: "FINANCIAMIENTO",
      salary: parseInt(salaryAsString), // Asegurarse de que salary sea un número
    };

    try {
      const response = await postClientData(submittedData);  // Llamar al servicio de API real

      /* Simular respuesta del servidor
      const response = {
        id: 1,
        rut: submittedData.rut,
        phone: submittedData.phone,
        typeFinance: submittedData.typeFinance,
        email: submittedData.email,
        workerType: submittedData.workerType,
        salary: submittedData.salary,
        startWorkingDate: submittedData.startWorkingDate,
      }; */

      // Guardar la respuesta en localStorage y avanzar al siguiente paso
      localStorage.setItem("formData", JSON.stringify(response));
      onNextStep(response);  // Pasar los datos como objeto, no como cadena JSON

    } catch (error) {
      setError("Error al enviar los datos, por favor inténtalo de nuevo.");
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
              name="phone"
              placeholder="+56 9 999 999 99"
              className="form-input"
              value={formData.phone}
              onChange={handleInputChange}
              maxLength="17"
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
              name="email"
              placeholder="Ej: correo@mail.com"
              className="form-input"
              value={formData.email}
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
              name="workerType"
              className="form-input"
              value={formData.workerType}
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
              style={{ width: '100%', maxWidth: '430px', height: '60px', padding: '12px 20px' }}
              name="salary"
              placeholder="Ej: 900.000"
              min={600000}
              className="form-input"
              value={formData.salary}
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
              name="startWorkingDate"
              className="form-input"
              value={formData.startWorkingDate}
              onChange={handleInputChange}
              max={getCurrentDate()}
              required
            />
          </div>
        </div>

        {/* Mostrar mensaje de error si existe */}
        {error && (
          <div style={{
            color: "red",
            fontSize: "14px",
            marginBottom: "10px",
            border: "1px solid red",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#fdd"
          }}>
            {error}
          </div>
        )}

        {/* Botones de navegación */}
        <div className="navButtonContainer">
          <button
            disabled={isLoading}
            className="atrasButton"
            onClick={() => navigate(-1)}
          >
            Atrás
          </button>
          {/* {error && <div style={{ color: "red" }}>{error}</div>} */}
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
