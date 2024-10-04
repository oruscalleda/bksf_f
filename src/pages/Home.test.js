import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Home } from './Home';
import { Link } from 'react-router-dom';

describe('Home component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Tipo de crédito')).toBeInTheDocument();
    expect(getByText('Financiamiento')).toBeInTheDocument();
    expect(getByText('RE - Financiamiento')).toBeInTheDocument();
  });

  it('renders logo image', () => {
    const { getByAltText } = render(<Home />);
    expect(getByAltText('Logo')).toBeInTheDocument();
  });

  it('renders financiar image', () => {
    const { getByAltText } = render(<Home />);
    expect(getByAltText('Financiamiento')).toBeInTheDocument();
  });

  it('renders refinanciar image', () => {
    const { getByAltText } = render(<Home />);
    expect(getByAltText('Refinanciamiento')).toBeInTheDocument();
  });

  it('renders links correctly', () => {
    const { getByText } = render(<Home />);
    const financiarLink = getByText('CONTINUAR');
    const refinanciarLink = getByText('CONTINUAR');

    expect(financiarLink).toHaveAttribute('href', '/financiarWizard');
    expect(refinanciarLink).toHaveAttribute('href', '/refinanciarWizard');
  });

  it('calls onClick handler when button is clicked', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Home />);
    const button = getByText('Atrás');

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});