import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { saveToLocalStorage } from '../../services/storageService';
import EntradaMoneda from '../../components/EntradaMoneda';
import { postClientData } from '../../services/apiService';
import { formatRUT, formatPhone, getCurrentDate } from '../../utils/formUtils';


const FormContacto = ({ onNextStep }) => {
  const location = useLocation();
  const { option } = useParams();
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    rut: '',
    phone: '+56 9',
    email: '',
    registrationNumber: '',
    typeFinance: 'RE-FINANCIAMIENTO',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    console.log('handleSubmit');
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    const formElements = formRef.current.elements;
    const vehicle = {};

    //Get the form data
    formData['rut'] = formElements['rut'].value
    formData['phone'] = formElements['telefono'].value
    formData['email'] = formElements['correo'].value
    vehicle['registrationNumber'] = formElements['patente'].value
    formData['vehicle'] = vehicle

    console.log(formData);

    try {
      //const response = await postClientData(formData);  // Llamar al servicio de API real

      const response = {id:1,rut:"23.454.654-6",phone:"879846546",typeFinance: 'FINANCIAMIENTO',email:'email@mail.com',workerType:"conGiro",salary:11155,startWorkingDate:'01/01/1990'};

      // Verificar que la respuesta tenga el id (suponiendo que está en response.id)
      if (response && response.id) {
        // Guardar el formData actualizado en el localStorage
        localStorage.setItem('formData', JSON.stringify(response));
        console.log(response);
        
        onNextStep(response);
       // navigate('/infoCredito', { state: { currentStep: 2 } });

      } else {
        throw new Error('ID no encontrado en la respuesta de la API');
      }
      
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


    // Manejar los cambios en los campos del formulario
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      const formattedValue = name === 'rut' ? formatRUT(value) : name === 'telefono' ? formatPhone(value) : value;
      setFormData((prevData) => ({ ...prevData, [name]: formattedValue }));
    };

  return (
    <div>
      {/* Título y subtítulo */}
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#004E9C', textAlign: 'left', paddingLeft: '10px' }}>
        Información de contacto
      </h1>
      <p style={{ fontSize: '15px', textAlign: 'left', paddingLeft: '10px'}}>
        Completa tus datos para poder contactarte correctamente
      </p>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="formControl-root">
          <label className='inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined'>RUT*</label>
          <div className='outlinedInput-root textField-root inputBase-root'>
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
          <label className='inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined'>Teléfono*</label>
          <div className='outlinedInput-root textField-root inputBase-root'>
            <input
              type="tel"
              name="telefono"
              placeholder="+56 9 999 999 99"
              className="form-input"
              value={formData.telefono}
              onChange={handleInputChange}
              maxLength="17"  // Limitar longitud para el formato de teléfono
              required
            />
          </div>
        </div>
        <div className="formControl-root">
          <label className='inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined'>Correo*</label>
          <div className='outlinedInput-root textField-root inputBase-root'>
            <input type="email" name="correo" placeholder="mail@mail.com" className='form-input' />
          </div>
        </div>
        <div className="formControl-root">
          <label className='inputLabel-root formLabel-root inputLabel-formControl inputLabel-outlined'>Patente vehículo (opcional)*</label>
          <div className='outlinedInput-root textField-root inputBase-root'>
            <input type="text" name="patente" />
          </div>
        </div>


        {/* Botones de navegación */}
        <div className="navButtonContainer">
          <button disabled={isLoading} className="atrasButton" onClick={() => navigate(-1)}>
            Atrás
          </button>
          {error && <div style={{ color: 'red' }}>{error}</div>}

          <button type="submit" disabled={isLoading} className="continuarButton">
            {isLoading ? 'Cargando...' : 'CONTINUAR'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormContacto;