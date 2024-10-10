import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { saveToLocalStorage } from "../../services/storageService";
import EntradaMoneda from "../../components/EntradaMoneda";
import { postClientData } from "../../services/apiService";
import {
  formatRUT,
  formatPhone,
  getCurrentDate,
  isValidRUT,
} from "../../utils/formUtils";

const FormContacto = ({ onNextStep, data }) => {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rut: data?.rut || "",
    phone: data?.phone || "+56 9",
    email: data?.email || "",
    typeFinance: "RE-FINANCIAMIENTO",
    registrationNumber: data?.registrationNumber || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    saveToLocalStorage("formData", formData);
  }, [formData]);

  const handleSubmit = async (event) => {
    console.log("handleSubmit");
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

    const formElements = formRef.current.elements;
    const vehicle = {};

    //Get the form data
    /* formData['rut'] = formElements['rut'].value
    formData['phone'] = formElements['phone'].value
    formData['email'] = formElements['email'].value
    vehicle['registrationNumber'] = formElements['registrationNumber'].value
    formData['vehicle'] = vehicle

    console.log(formData); */

    // Preparar los datos para enviarlos
    const submittedData = {
      ...formData, // Incluir los datos actuales del formulario
      typeFinance: "RE-FINANCIAMIENTO",
    };

    try {
      const response = await postClientData(formData); // Llamar al servicio de API real

      // const response = {id:1,rut:"23.454.654-6",phone:"879846546",typeFinance: 'FINANCIAMIENTO',email:'email@mail.com',workerType:"conGiro",salary:11155,startWorkingDate:'01/01/1990'};

      if (response && response.id) {
        // Guardar el formData actualizado en el localStorage
        localStorage.setItem("formData", JSON.stringify(response));

        onNextStep(response);
      } else {
        throw new Error("ID no encontrado en la respuesta de la API");
        // navigate('/infoCredito', { state: { currentStep: 2 } });
      }
    } catch (error) {
      setError("Error al enviar los datos, por favor inténtalo de nuevo.");
      console.error("Error al enviar los datos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Letras permitidas para el formato de patentes
  const allowedLetters = [
    "B",
    "C",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "P",
    "R",
    "S",
    "T",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  // Función para aplicar la máscara de patente
  const formatPatent = (value) => {
    // Eliminar cualquier caracter que no sea letra o número
    let cleanValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    // Filtrar solo letras permitidas
    cleanValue = cleanValue
      .split("")
      .filter((char) => allowedLetters.includes(char) || !isNaN(char))
      .join("");

    // Aplicar el formato de 2 letras y 4 números o 4 letras y 2 números
    if (cleanValue.length <= 6 && /^[A-Z]{2}/.test(cleanValue)) {
      // 2 letras y 4 números
      return cleanValue.replace(/^([A-Z]{2})([0-9]{0,4})$/, "$1·$2");
    } else if (cleanValue.length > 6) {
      // 4 letras y 2 números
      return cleanValue.replace(
        /^([A-Z]{2})([A-Z]{2})([0-9]{0,2})$/,
        "$1-$2·$3"
      );
    }

    return cleanValue;
  };

  // Manejar los cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "rut") {
      formattedValue = formatRUT(value);
    } else if (name === "phone") {
      formattedValue = formatPhone(value);
    } else if (name === "registrationNumber") {
      formattedValue = formatPatent(value); // Aplicar máscara a la patente
    }

    setFormData((prevData) => ({ ...prevData, [name]: formattedValue }));
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

    return null; // Sin errores
  };

  return (
    <div>
      {/* Título y subtítulo */}
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#004E9C",
          textAlign: "left",
          paddingLeft: "10px",
        }}
      >
        Información de contacto
      </h1>
      <p style={{ fontSize: "15px", textAlign: "left", paddingLeft: "10px" }}>
        Completa tus datos para poder contactarte correctamente
      </p>
      {/* Campo de RUT */}
      <form ref={formRef} onSubmit={handleSubmit}>
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
              maxLength="17" // Limitar longitud para el formato de teléfono
              required
            />
          </div>
        </div>
        <div className="formControl-root">
          <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
            Correo*
          </label>
          <div className="outlinedInput-root textField-root inputBase-root">
            <input
              type="email"
              onChange={handleInputChange}
              value={formData.email}
              name="email"
              placeholder="mail@mail.com"
              className="form-input"
            />
          </div>
        </div>
        <div className="formControl-root">
          <label className="inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined">
            Patente vehículo (opcional)*
          </label>
          <div className="outlinedInput-root textField-root inputBase-root">
            <input
              onChange={handleInputChange}
              value={formData.registrationNumber}
              className="form-input"
              type="text"
              name="registrationNumber"
            />
          </div>
        </div>

        {error && (
          <div
            style={{
              color: "red",
              fontSize: "14px",
              marginBottom: "10px",
              border: "1px solid red",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#fdd",
            }}
          >
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

export default FormContacto;
