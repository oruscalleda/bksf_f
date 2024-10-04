import React, { useState } from 'react'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

const defaultMaskOptions = {
    prefix: '$',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
    decimalLimit: 2, // how many digits allowed after the decimal
    integerLimit: 10, // limit length of integer numbers
    allowNegative: false,
    allowLeadingZeroes: false,
}
const EntradaMoneda = ({ maskOptions, ...inputProps }) => {
    const currencyMask = createNumberMask({...defaultMaskOptions,...maskOptions });
    const [value, setValue] = useState('');

    const handleChange = (event) => {
      const inputValue = event.target.value;
      const unmaskedValue = inputValue.replace(/[^\d.-]/g, ''); // remove mask characters
      const numericValue = parseFloat(unmaskedValue); // parse to a number
      setValue(numericValue);
      console.log('monedavalue:' + value)
    };
    return (
        <MaskedInput
          mask={currencyMask}
          onChange={handleChange}
          value={value}
          {...inputProps}
        />
      );
}

export default EntradaMoneda