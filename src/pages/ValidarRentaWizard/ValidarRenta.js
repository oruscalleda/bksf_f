import React from 'react';
//import './ValidarRenta.css'

const ValidarRenta = ({ steps, currentStep, onChange }) => {
    return (
        <div>
            <h1>Validar renta</h1>
            <p>Para validar tu renta, elige entre las dos opciones</p>

            <div class="card">
                <div class="card-header">
                    <p class="card-title">Validar de forma ágil y digital</p>
                </div>
                <div class="card-body" >
                    <div className='form-container'>
                        <p class="card-text">La información viajara encriptada de extremo a extremo</p>
                        <p class="card-text">Tus datos te pertenecen y serán compartidos solo con Crediautos</p>
                    </div>
                    <div>
                        <p class="card-text">Acepto los términos y condiciones para brindar acceso a Floid a mi información financiera y comparta mi información financiera de forma exclusiva con Crediautos.</p>
                    </div>
                    <a href="#" class="btn continuarButton">CONTINUAR</a>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <p class="card-title">Validar renta con agente</p>
                    <p class="card-text">Un agentes se pondrá en contacto contigo para validar tu renta</p>
                    <a href="#" class="btn continuarButton">CONTINUAR</a>
                </div>
            </div>

        </div>
    );
};

export default ValidarRenta