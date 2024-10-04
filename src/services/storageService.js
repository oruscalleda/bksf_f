// storageService.js
export const saveToLocalStorage = (key, data) => {
    if (data) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  };
  
  export const getFromLocalStorage = (key) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  };  