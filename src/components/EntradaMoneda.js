import React, { useState } from "react";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

import "../pages/financiarWizard/FinanciarWizard.scss";

const defaultMaskOptions = {
  prefix: "$",
  suffix: "",
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ".",
  allowDecimal: true,
  decimalSymbol: ",",
  decimalLimit: 2, // Limitar a 2 decimales
  integerLimit: 10, // Limitar a 10 dígitos
  allowNegative: false,
  allowLeadingZeroes: false,
};

const EntradaMoneda = ({ maskOptions, min, ...inputProps }) => {
  // Crear la máscara con las opciones por defecto o personalizadas
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  });

  // Estado para almacenar el valor formateado
  const [value, setValue] = useState("");

  // Manejar el cambio en el input
  const handleChange = (event) => {
    let inputValue = event.target.value;

    // Obtener el valor numérico sin formato
    let numericValue = getNumericValue(inputValue);

    // Verificar el valor mínimo y ajustar si es necesario
    if (min && numericValue < min) {
      numericValue = min;
      inputValue = min.toLocaleString("es-ES", { minimumFractionDigits: 2 });
    }

    setValue(inputValue); // Actualizar el estado con el valor (formateado o ajustado)
  };

  // Obtener el valor numérico sin formato
  const getNumericValue = (inputValue) => {
    const unmaskedValue = inputValue.replace(/[^\d,-]/g, ""); // Eliminar caracteres de formato
    return parseFloat(unmaskedValue.replace(",", ".")) || 0; // Convertir a número o retornar 0 si es inválido
  };

  return (
    <MaskedInput
      className="form-input"
      mask={currencyMask} // Aplicar la máscara
      value={value} // Mostrar el valor formateado
      onChange={handleChange} // Manejar el cambio
      {...inputProps} // Pasar otros props del input
    />
  );
};

export default EntradaMoneda;
