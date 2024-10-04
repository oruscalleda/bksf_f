import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { FinanciarWizard } from './FinanciarWizard';
import { StepNav } from '../StepNav';
import { FormContacto } from './FormContacto';
import { FormCredito } from './FormCredito';
import { Simulacion } from './Simulacion';
import { ValidarRenta } from '../ValidarRenta/ValidarRenta';

describe('FinanciarWizard component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<FinanciarWizard />);
    expect(getByText('Paso 1 de 4')).toBeInTheDocument();
  });

  it('renders step indicator correctly', () => {
    const { getByClassName } = render(<FinanciarWizard />);
    const grayBar = getByClassName('gray-bar');
    const blueBar = getByClassName('blue-bar');

    expect(grayBar).toBeInTheDocument();
    expect(blueBar).toBeInTheDocument();
  });

  it('renders StepNav component correctly', () => {
    const { getByText } = render(<FinanciarWizard />);
    expect(getByText('Info de contacto')).toBeInTheDocument();
    expect(getByText('Info del crédito')).toBeInTheDocument();
    expect(getByText('Simulación')).toBeInTheDocument();
    expect(getByText('Validar renta')).toBeInTheDocument();
  });

  it('renders current step component correctly', () => {
    const { getByText } = render(<FinanciarWizard />);
    expect(getByText('FormContacto')).toBeInTheDocument();
  });

  it('calls handleNextStep function when next step button is clicked', () => {
    const handleNextStep = jest.fn();
    const { getByText } = render(<FinanciarWizard />);
    const nextStepButton = getByText('Siguiente');

    fireEvent.click(nextStepButton);
    expect(handleNextStep).toHaveBeenCalledTimes(1);
  });

  it('calls handlePreviousStep function when previous step button is clicked', () => {
    const handlePreviousStep = jest.fn();
    const { getByText } = render(<FinanciarWizard />);
    const previousStepButton = getByText('Anterior');

    fireEvent.click(previousStepButton);
    expect(handlePreviousStep).toHaveBeenCalledTimes(1);
  });

  it('renders correct step component when currentStep changes', () => {
    const { getByText, rerender } = render(<FinanciarWizard />);
    expect(getByText('FormContacto')).toBeInTheDocument();

    rerender(<FinanciarWizard currentStep={2} />);
    expect(getByText('FormCredito')).toBeInTheDocument();

    rerender(<FinanciarWizard currentStep={3} />);
    expect(getByText('Simulacion')).toBeInTheDocument();

    rerender(<FinanciarWizard currentStep={4} />);
    expect(getByText('ValidarRenta')).toBeInTheDocument();
  });
});