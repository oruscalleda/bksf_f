import React from 'react';
import validarAgente from '../img/validarAgente.png';



const ValidarConAgente = ({ steps, currentStep, onChange }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '10px',
      width: '400px',
      padding: '20px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'
    }}>
      <img
        src={validarAgente} // Reemplaza con la URL de tu imagen real
        alt="Customer service"
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '10px',
          marginBottom: '20px'
        }}
      />
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#e1f0fa',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto 15px'
        }}>
          <span style={{
            color: '#004e9c',
            fontSize: '24px'
          }}>
            &#10003; {/* Unicode checkmark */}
          </span>
        </div>
        <h2 style={{
          color: '#004e9c',
          fontSize: '20px',
          fontWeight: 'bold'
        }}>
          Gracias por preferirnos
        </h2>
        <p style={{
          color: '#555',
          margin: '10px 0'
        }}>
          Un agente se pondrá en contacto contigo para ayudarte
        </p>
        <p style={{
          color: '#555',
          margin: '10px 0'
        }}>
          Horario de atención: Lunes a sábado de 9:00 a 18:00 excepto feriados
        </p>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button style={{
          backgroundColor: '#004e9c',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = '#003a7a'}
        onMouseOut={e => e.currentTarget.style.backgroundColor = '#004e9c'}
        >
          Finalizar
        </button>
      </div>
    </div>
  );
};

export default ValidarConAgente