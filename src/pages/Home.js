import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

import logo from "../img/logo.png";
import financiar from "../img/financiar.png";
import refinanciar from "../img/refinanciar.png";

import "./Home.scss";

const imgFinanciar = <img src={financiar} alt="Financiamiento" />;

const imgRefinanciar = <img src={refinanciar} alt="Refinanciamiento" />;

const Home = () => {
  return (
    <div className="home-container">
      <header>
        <img src={logo} alt="Logo" className="app-logo" />
        <div className="header-text-container">
          <h1>Tipo de crédito</h1>
          <p>Selecciona la opción de financiamiento que necesitas</p>
        </div>
      </header>

      <div className="home-button-container">
        {/* Botón Financiamiento */}
        <Link to="/financiarWizard" className="financiar-wizard-link">
          <div className="wizard-container">
            <div className="card-top">
              <div className="card-top-text">
                <h1>Financiamiento</h1>
                <p>Financiamos hasta el 80% del valor de tu vehículo</p>
              </div>
              {isMobile ? imgFinanciar : null}
            </div>
            <div className="card-footer">
              <p>¡No lo pienses más, tu nuevo auto está cada vez más cerca!</p>
              <div className="financiar-btn">
                {!isMobile ? imgFinanciar : null}
                <span className="continue-btn">CONTINUAR</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Botón RE - Financiamiento */}
        <Link to="/refinanciarWizard" className="refinanciar-wizard-link">
          <div className="wizard-container">
            <div className="card-top">
              <div className="card-top-text">
                <h1>
                  <span style={{ color: "rgb(0, 0, 0)" }}>RE-</span>
                  <span style={{ color: "rgb(30, 58, 138)" }}>
                    Financiamiento
                  </span>
                </h1>
                <p>Baja la cuota de tu crédito automotriz aquí ¡100% online!</p>
              </div>
              {isMobile ? imgRefinanciar : null}
            </div>
            <div className="card-footer">
              <p>¡No lo pienses más, tu nuevo auto está cada vez más cerca!</p>
              <div className="financiar-btn">
                {!isMobile ? imgRefinanciar : null}
                <span className="continue-btn">CONTINUAR</span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Botón Atrás */}
      <input type="button" className="back-btn" value="Atrás" />
    </div>
  );
};

export default Home;
