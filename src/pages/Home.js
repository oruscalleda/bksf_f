import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

import logo from "../img/logo.png";
import financiar from "../img/financiar.png";
import refinanciar from "../img/refinanciar.png";

import http from "../components/httpClient";

const buttonStyle = {
  backgroundColor: "rgb(234, 243, 250)",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px",
  width: "100%",
};

const textContainerStyle = {
  flex: "1",
  textAlign: "left",
  marginLeft: "15px",
  paddingBottom: "5px",
};

const imageStyleMobile = {
  width: "90px",
  height: "auto",
  position: "absolute",
  right: 0,
  bottom: 0,
  marginRight: "10px",
};

const footerStyle = {
  backgroundColor: "rgb(90, 160, 227)",
  borderRadius: "0px 0px 10px 10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "white",
  fontSize: "1rem",
  fontWeight: "normal",
  flexDirection: "row",
  width: "100%",
};

const footerStyleMobile = {
  backgroundColor: "rgb(90, 160, 227)",
  borderRadius: "0px 0px 10px 10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "white",
  fontSize: "1rem",
  fontWeight: "normal",
  flexDirection: "column",
  width: "100%",
};

const buttonFooterStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "rgb(30, 58, 138)",
  padding: "7px 27px",
  borderRadius: "25px",
  fontWeight: "bold",
  color: "white",
  fontSize: "1rem",
  flexDirection: "column",
  marginBottom: "5px",
};

const imgFinanciar = (
  <img
    src={financiar}
    alt="Financiamiento"
    style={isMobile ? imageStyleMobile : null}
  />
);

const imgRefinanciar = (
  <img
    src={refinanciar}
    alt="Refinanciamiento"
    style={isMobile ? imageStyleMobile : null}
  />
);

const ej = {
  id: 0,
  rut: "12345678",
  dv: "9",
  phone: "+56912345678",
  email: "example@testmail.com",
  workerType: "Full-Time",
  salary: 1500000,
  startWorkingDate: "2021-05-12",
  carValue: 12000000,
  footAmount: 3000000,
  fee: 400000,
  caryear: 2020,
  typeFinance: "Credit",
  registrationNumber: "ABC123",
  creation_dateDate: "2023-10-07",
};

const sendTest = () => {
  const algo = http.post("client", ej);
  console.log("algo ", algo);
};

const Home = () => {
  return (
    <div
      style={{
        maxWidth: "1200px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <header>
        <img
          src={logo}
          alt="Logo"
          className="app-logo"
          style={{ marginRight: "10px", marginLeft: "-15px" }}
        />
        <div className="header-text-container">
          <h1 style={{ textAlign: "left" }}>Tipo de crédito</h1>
          <p>Selecciona la opción de financiamiento que necesitas</p>
        </div>
      </header>

      <main>
        <button onClick={() => sendTest()}>Hey</button>
        <div className="home-button-container">
          {/* Botón Financiamiento */}
          <Link
            to="/financiarWizard"
            style={{
              textDecoration: "none",
              display: "block",
              width: "100%",
              position: "relative",
            }}
          >
            <div style={buttonStyle}>
              <div
                className="card-top"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="card-top-text" style={textContainerStyle}>
                  <h1
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: "rgb(30, 58, 138)",
                      marginBottom: "10px",
                      textAlign: "left",
                    }}
                  >
                    Financiamiento
                  </h1>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "rgb(0, 0, 0)",
                      margin: "0px",
                      textAlign: "left",
                    }}
                  >
                    Financiamos hasta el 80% del valor de tu vehículo
                  </p>
                </div>
                {isMobile ? imgFinanciar : null}
              </div>
              <div style={isMobile ? footerStyleMobile : footerStyle}>
                <p style={{ marginLeft: "15px", marginTop: "15px" }}>
                  ¡No lo pienses más, tu nuevo auto está cada vez más cerca!
                </p>
                <div className="financiar-btn">
                  {!isMobile ? imgFinanciar : null}
                  <div style={buttonFooterStyle}>
                    <span>CONTINUAR</span>
                    <span
                      style={{ fontSize: "1.5rem", marginLeft: "10px" }}
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Botón RE - Financiamiento */}
          <Link
            to="/refinanciarWizard"
            style={{
              textDecoration: "none",
              display: "block",
              width: "100%",
              marginTop: "25px",
              position: "relative",
            }}
          >
            <div style={buttonStyle}>
              <div
                className="card-top"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="card-top-text" style={textContainerStyle}>
                  <h1
                    style={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      marginBottom: "10px",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ color: "rgb(0, 0, 0)" }}>RE-</span>
                    <span style={{ color: "rgb(30, 58, 138)" }}>
                      Financiamiento
                    </span>
                  </h1>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "rgb(0, 0, 0)",
                      margin: "0px",
                      textAlign: "left",
                    }}
                  >
                    Baja la cuota de tu crédito automotriz aquí ¡100% online!
                  </p>
                </div>
                {isMobile ? imgRefinanciar : null}
              </div>
              <div style={isMobile ? footerStyleMobile : footerStyle}>
                <p style={{ marginLeft: "15px", marginTop: "15px" }}>
                  ¡No lo pienses más, tu nuevo auto está cada vez más cerca!
                </p>
                <div className="financiar-btn">
                  {!isMobile ? imgRefinanciar : null}
                  <div style={buttonFooterStyle}>
                    <span>CONTINUAR</span>
                    <span
                      style={{ fontSize: "1.5rem", marginLeft: "10px" }}
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Botón Atrás */}
        <div
          style={{
            marginTop: "25px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <input type="button" className="atrasButton" value="Atrás" />
        </div>
      </main>
    </div>
  );
};

export default Home;
