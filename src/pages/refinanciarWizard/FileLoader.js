import React, { useState } from "react";
import { isMobile } from "react-device-detect";

const FileLoader = ({ handleLoadFile }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleLoadFile(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("file-upload").click();
  };

  return (
    <>
      {!isMobile ? (
        // Desktop layout
        <div className="file-loader">
          <label htmlFor="file-upload" className="file-label">
            Documento de prepago (opcional)
          </label>
          <input
            type="file"
            id="file-upload"
            className="file-input"
            onChange={handleFileUpload}
            accept=".pdf, .jpg, .jpeg, .png"
          />
          <span className="file-button" onClick={triggerFileInput}>
            Agregar documento
          </span>
        </div>
      ) : (
        // Mobile layout
        <div className="file-loader">
          <label htmlFor="file-upload" className="file-label">
            Documento de prepago (opcional)
          </label>
          <div className="mobile-file-upload">
            <div style={{ width: "60%" }}>
              <input
                type="file"
                id="file-upload"
                className="file-input"
                onChange={handleFileUpload}
                accept=".pdf, .jpg, .jpeg, .png"
              />
              <span className="file-button" onClick={triggerFileInput}>
                Agregar documento
              </span>
            </div>
            <span className="accept-file-info" style={{ width: "40%" }}>
              Formatos: JPG, PDF, PNG. Tamaño máximo: 3MB
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default FileLoader;
