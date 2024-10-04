// formUtils.js
export const formatRUT = (value) => {
    let cleanValue = value.replace(/[^\dkK]/g, '');
    if (cleanValue.length > 9) cleanValue = cleanValue.slice(0, 9);
    
    let rutBody = cleanValue.slice(0, -1);
    let dv = cleanValue.slice(-1).toUpperCase();
    
    let formattedRUT = rutBody.replace(/(\d{1,2})(\d{3})(\d{3})$/, '$1.$2.$3');
    if (dv) formattedRUT = `${formattedRUT}-${dv}`;
    return formattedRUT;
  };
  
   // Función para formatear el teléfono con la máscara "+56 9 394 827 81"
   export const formatPhone = (value) => {
  // Eliminar caracteres no numéricos, excepto el prefijo fijo
  let phone = value.replace(/[^\d]/g, '');

  // Mantener el prefijo "+56 9" fijo
  if (!phone.startsWith('569')) {
    phone = '569';
  }

  // Limitar el número de dígitos después del "+56 9" a un máximo de 8 dígitos
  phone = phone.slice(0, 11);

  // Aplicar la máscara "9 394 827 81" al resto del número
  if (phone.length > 4) {
    phone = phone.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1 $2 $3 $4');
  } else if (phone.length > 3) {
    phone = phone.replace(/(\d{3})(\d{1,3})/, '$1 $2');
  }

  return `+56 9 ${phone.slice(3)}`;
};
  
  export const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };  