// formUtils.js

// Formatear RUT chileno
export const formatRUT = (value) => {
  let cleanValue = value.replace(/[^\dkK]/g, ''); // Elimina caracteres no numéricos y deja "k/K"
  if (cleanValue.length > 9) cleanValue = cleanValue.slice(0, 9); // Limita el RUT a 9 caracteres
  
  let rutBody = cleanValue.slice(0, -1); // Parte numérica del RUT
  let dv = cleanValue.slice(-1).toUpperCase(); // Dígito verificador

  // Aplica formato de puntos y guion
  let formattedRUT = rutBody.replace(/(\d{1,2})(\d{3})(\d{3})$/, '$1.$2.$3');
  if (dv) formattedRUT = `${formattedRUT}-${dv}`; 
  return formattedRUT;
};

// Validar RUT chileno
export const isValidRUT = (rut) => {
  let cleanRUT = rut.replace(/[^\dkK]/g, '').toUpperCase(); // Limpiar RUT
  let rutBody = cleanRUT.slice(0, -1); // Parte numérica
  let dvIngresado = cleanRUT.slice(-1); // Dígito verificador ingresado

  // Comparar el dígito verificador ingresado con el calculado
  let dvCalculado = calculateDV(rutBody);
  return dvIngresado === dvCalculado;
};

// Calcular el dígito verificador del RUT
const calculateDV = (rutBody) => {
  let suma = 0;
  let multiplo = 2;

  // Cálculo del dígito verificador
  for (let i = rutBody.length - 1; i >= 0; i--) {
      suma += parseInt(rutBody[i]) * multiplo;
      multiplo = (multiplo === 7) ? 2 : multiplo + 1;
  }

  let residuo = 11 - (suma % 11);
  if (residuo === 11) return '0';
  if (residuo === 10) return 'K';
  return residuo.toString();
};

// Validar formato de patente (2 letras y 4 números o 4 letras y 2 números)
export function validarPatente(patente) {
  const regex = /^[A-Z]{2}[0-9]{4}$|^[A-Z]{4}[0-9]{2}$/;
  return regex.test(patente.toUpperCase());
}

// Validar que el pie sea al menos el 20% del valor del vehículo
export function validarPie(pie, valorVehiculo) {
  const porcentajeMinimo = 0.20;
  const valorMinimoPie = valorVehiculo * porcentajeMinimo;

  return pie >= valorMinimoPie; // Retorna verdadero si el pie es mayor o igual al mínimo
}

// Formatear número de teléfono con el formato "+56 9 394 827 81"
export const formatPhone = (value) => {
  let phone = value.replace(/[^\d]/g, ''); // Elimina todo excepto números

  if (!phone.startsWith('569')) {
      phone = '569'; // Asegura que siempre empiece con 569
  }

  // Limita los dígitos después de 569 a 8 números
  phone = phone.slice(0, 11);

  // Formatea el número de teléfono en bloques
  if (phone.length > 4) {
      phone = phone.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1 $2 $3 $4');
  } else if (phone.length > 3) {
      phone = phone.replace(/(\d{3})(\d{1,3})/, '$1 $2');
  }

  return `+56 9 ${phone.slice(3)}`;
};

// Obtener la fecha actual en formato "yyyy-mm-dd"
export const getCurrentDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};
