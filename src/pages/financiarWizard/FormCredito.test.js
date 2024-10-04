import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { FormCredito } from './FormCredito';
import { EntradaMoneda } from '../../components/EntradaMoneda';
import { YearSelect } from '../../components/YearSelect';

describe('FormCredito component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<FormCredito />);
    expect(getByText('Información del crédito a solicitar')).toBeInTheDocument();
  });

  it('renders form fields correctly', () => {
    const { getByLabelText } = render(<FormCredito />);
    expect(getByLabelText('Valor aproximado del vehículo*')).toBeInTheDocument();
    expect(getByLabelText('Monto del pie*')).toBeInTheDocument();
    expect(getByLabelText('Número de cuotas*')).toBeInTheDocument();
    expect(getByLabelText('Año del vehículo*')).toBeInTheDocument();
  });

  it('calls handleSubmit function when form is submitted', () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(<FormCredito onNextStep={handleSubmit} />);
    const submitButton = getByText('CONTINUAR');

    fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('calls handlePreviousStep function when previous step button is clicked', () => {
    const handlePreviousStep = jest.fn();
    const { getByText } = render(<FormCredito onPreviousStep={handlePreviousStep} />);
    const previousStepButton = getByText('Atrás');

    fireEvent.click(previousStepButton);
    expect(handlePreviousStep).toHaveBeenCalledTimes(1);
  });

  it('renders error message when form submission fails', async () => {
    const { getByText } = render(<FormCredito />);
    const submitButton = getByText('CONTINUAR');

    fireEvent.click(submitButton);
    await waitFor(() => getByText('Failed to submit the data. Please try again.'));
  });

  it('navigates to next page when form submission is successful', async () => {
    const navigate = jest.fn();
    const { getByText } = render(<FormCredito onNextStep={navigate} />);
    const submitButton = getByText('CONTINUAR');

    fireEvent.click(submitButton);
    await waitFor(() => expect(navigate).toHaveBeenCalledTimes(1));
  });
});