

export const postClientData = async (clientData) => {
  const url = `${process.env.REACT_APP_API_URL}/client`;  // Construcción dinámica de la URL

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      body: JSON.stringify(clientData),
      mode: 'cors',
    });

    if (!response.ok) {
      const errorMessage = `Failed with status: ${response.status}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    // Verifica si el contenido es JSON antes de llamarlo
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();  // Retorna los datos de la API en JSON
      return data;
    } else {
      throw new Error('The server did not return a JSON response.');
    }

  } catch (error) {
    console.error('Error sending client data:', error);
    throw error;
  }
};

export const updateClientData = async (id, clientData) => {
  const url = `${process.env.REACT_APP_API_URL}/client/${id}`;  // Construcción dinámica de la URL con el ID

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      body: JSON.stringify(clientData),
      mode: 'cors',
    });

    if (!response.ok) {
      const errorMessage = `Failed with status: ${response.status}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    // Verifica si el contenido es JSON antes de llamarlo
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();  // Retorna los datos de la API en JSON
      return data;
    } else {
      throw new Error('The server did not return a JSON response.');
    }

  } catch (error) {
    console.error('Error updating client data:', error);
    throw error;  // Se propaga el error al llamador
  }
};

export const INDEXAIntegracioncreditos = async (data) => {

  try {
  } catch (error) {
    console.error('Error updating client data:', error);
    throw error;
  }

};

