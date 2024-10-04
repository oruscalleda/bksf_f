import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { FormContacto } from './FormContacto';
import { EntradaMoneda } from '../../components/EntradaMoneda';
import { values } from '../../utils/values.json';

describe('FormContacto component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<FormContacto />);
    expect(getByText('Información de contacto')).toBeInTheDocument();
  });

  it('renders form fields correctly', () => {
    const { getByLabelText } = render(<FormContacto />);
    expect(getByLabelText('RUT*')).toBeInTheDocument();
    expect(getByLabelText('Teléfono*')).toBeInTheDocument();
    expect(getByLabelText('Correo*')).toBeInTheDocument();
    expect(getByLabelText('Tipo de empleo*')).toBeInTheDocument();
    expect(getByLabelText('Renta líquida*')).toBeInTheDocument();
    expect(getByLabelText('Fecha de ingreso laboral*')).toBeInTheDocument();
  });

  it('calls handleSubmit function when form is submitted', () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(<FormContacto onNextStep={handleSubmit} />);
    const submitButton = getByText('CONTINUAR');

    fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('calls handleChange function when form field changes', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(<FormContacto />);
    const rutInput = getByLabelText('RUT*');

    fireEvent.change(rutInput, { target: { value: '11.11.11.111-1' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders error message when form submission fails', async () => {
    const { getByText } = render(<FormContacto />);
    const submitButton = getByText('CONTINUAR');

    fireEvent.click(submitButton);
    await waitFor(() => getByText('Fallo al enviar la información.'));
  });

  it('navigates to next page when form submission is successful', async () => {
    const navigate = jest.fn();
    const { getByText } = render(<FormContacto onNextStep={navigate} />);
    const submitButton = getByText('CONTINUAR');

    fireEvent.click(submitButton);
    await waitFor(() => expect(navigate).toHaveBeenCalledTimes(1));
  });
});