import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Simulacion } from './Simulacion';

describe('Simulacion component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Simulacion />);
    expect(getByText('Resultados de simulación')).toBeInTheDocument();
  });

  it('calls handleCalculate on button click', () => {
    const handleCalculate = jest.fn();
    const { getByText } = render(<Simulacion handleCalculate={handleCalculate} />);
    const button = getByText('RECALCULAR');
    fireEvent.click(button);
    expect(handleCalculate).toHaveBeenCalledTimes(1);
  });

  it('renders options list when showOptions is true', () => {
    const data = [
      { id: 1, titulo: 'Option 1', valorCuota: '100.000', cae: '20%', total: '200.000' },
      { id: 2, titulo: 'Option 2', valorCuota: '150.000', cae: '25%', total: '300.000' },
    ];
    const { getByText } = render(<Simulacion showOptions={true} data={data} />);
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();
  });

  it('renders error message when error is present', () => {
    const error = 'Error message';
    const { getByText } = render(<Simulacion error={error} />);
    expect(getByText('Error: Error message')).toBeInTheDocument();
  });

  it('renders loading message when loading is true', () => {
    const { getByText } = render(<Simulacion loading={true} />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });
});