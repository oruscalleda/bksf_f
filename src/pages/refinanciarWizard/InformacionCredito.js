import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConDetalle from './ConDetalle'; // Importa el componente ConDetalle
import SinDetalle from './SinDetalle'; // Importa el componente SinDetalle

const InfoCredito = ({ steps, currentStep, onChange, onNextStep, onPreviousStep, onScreenChange, data }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const [currentScreen, setCurrentScreen] = useState('default'); // Estado para manejar las pantallas
    const navigate = useNavigate();

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleRadioClick = (value) => {
        setSelectedValue(value);
    };

    const handleNextStep = () => {
        if (selectedValue === "conDetalle") {
            setCurrentScreen('conDetalle'); // Cambiar a la pantalla de ConDetalle
        } else if (selectedValue === "sinDetalle") {
            setCurrentScreen('sinDetalle'); // Cambiar a la pantalla de SinDetalle
        }
    };

    const handlePreviousStep = () => {
        onPreviousStep(data);
    };


        // Función para regresar a la pantalla principal de InfoCredito
        const handleBackToInfoCredito = () => {
            setCurrentScreen('default'); // Regresar a la pantalla principal
        };

    return (
        <div className='button-container'>
            {currentScreen === 'default' && (
                <div className='button-container-content'>
                    <h1 style={{ alignSelf: 'baseline'}}>Información del crédito</h1>
                    <p style={{marginBottom: '25px'}}>Ahora debes definir si conoces el detalle de tu deuda</p>

                    <div
                        className={`option-container ${selectedValue === "conDetalle" ? "selected" : ""}`}
                        onClick={() => handleRadioClick("conDetalle")}
                    >
                        <input
                            type="radio"
                            name="infoCredito"
                            value="conDetalle"
                            checked={selectedValue === "conDetalle"}
                            onChange={handleRadioChange}
                            style={{ display: 'none' }}  // Ocultamos el radio button para usar solo el estilo
                        />
                        <span className='button-label'>Tengo claro el monto de mi deuda</span>
                    </div>

                    <div
                        className={`option-container ${selectedValue === "sinDetalle" ? "selected" : ""}`}
                        onClick={() => handleRadioClick("sinDetalle")}
                    >
                        <input
                            type="radio"
                            name="infoCredito"
                            value="sinDetalle"
                            checked={selectedValue === "sinDetalle"}
                            onChange={handleRadioChange}
                            style={{ display: 'none' }}  // Ocultamos el radio button
                        />
                        <span className='button-label'>No tengo el detalle de mi deuda</span>
                    </div>

                    <div className='navButtonContainer'>
                        <input type='button' className="atrasButton" onClick={handlePreviousStep} value="Atrás" />
                        <input type='button' className="continuarButton" value="CONTINUAR" onClick={handleNextStep} />
                    </div>
                </div>
            )}

            {/* Renderiza Condicionalmente las pantallas seleccionadas */}
            {currentScreen === 'conDetalle' && <ConDetalle onBack={handleBackToInfoCredito} />}
            {currentScreen === 'sinDetalle' && <SinDetalle onBack={handleBackToInfoCredito} />}
        </div>
    );
};

export default InfoCredito;