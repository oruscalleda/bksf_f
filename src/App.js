import Layout from "./pages/Layout";
//import './Mobile.css';
//import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import { isMobile } from "react-device-detect";

import { useEffect } from "react";

import NoPage from "./pages/NoPage";
import Home from "./pages/Home";
import FormContacto from "./pages/financiarWizard/FormContacto";
import FormCredito from "./pages/financiarWizard/FormCredito";
import FinanciarWizard from "./pages/financiarWizard/FinanciarWizard";
import RefinanciarWizard from "./pages/refinanciarWizard/RefinanciarWizard";
import ConDetalle from "./pages/refinanciarWizard/ConDetalle";
import SinDetalle from "./pages/refinanciarWizard/SinDetalle";
import ValidarRenta from "./pages/ValidarRenta/ValidarRenta";
import Simulacion from "./pages/financiarWizard/Simulacion";
import InfoCredito from "./pages/refinanciarWizard/InformacionCredito";
import LoadingScreen from "./pages/financiarWizard/Loading";
import Exito from "./pages/Exito";
import ValidarConAgente from "./pages/ValidarConAgente";

function App() {
  useEffect(() => {
    if (isMobile) {
      import("./Mobile.css").then(() => {
        console.log("Mobile CSS loaded");
      });
    } else {
      import("./App.css").then(() => {
        console.log("Desktop CSS loaded");
      });
    }
  }, []);

  return (
    <div className="app-container">
      <Helmet>
        <script src="//cdn.muicss.com/mui-0.10.3/js/mui.min.js" />
        {/*<link rel="stylesheet" type="text/css" href={cssFile} /> */}
      </Helmet>
      <div className="app-content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route index element={<Home />} />
            <Route path="financiar" element={<FormContacto />} />
            <Route path="refinanciar" element={<FormContacto />} />
            <Route path="formCredito" element={<FormCredito />} />
            <Route path="financiarWizard" element={<FinanciarWizard />} />
            <Route path="refinanciarWizard" element={<RefinanciarWizard />} />
            <Route path="conDetalle" element={<ConDetalle />} />
            <Route path="sinDetalle" element={<SinDetalle />} />
            <Route path="simulacion" element={<Simulacion />} />
            <Route path="validarRenta" element={<ValidarRenta />} />
            <Route path="infoCredito" element={<InfoCredito />} />
            <Route path="generar" element={<LoadingScreen />} />
            <Route path="exito" element={<Exito />} />
            <Route path="ValidarConAgente" element={<ValidarConAgente />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
