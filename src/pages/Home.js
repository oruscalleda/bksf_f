import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import financiar from '../img/financiar.png';
import refinanciar from '../img/refinanciar.png';

const buttonStyle = {
  backgroundColor: 'rgb(234, 243, 250)',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px',
  width: '100%'
};

const textContainerStyle = {
  flex: '1',
  textAlign: 'left',
  marginLeft: '28px',
  paddingBottom: '5px',
};

const imageStyle = {
  width: '91px',
  height: 'auto',
  marginTop: '9px',
};

const footerStyle = {
  backgroundColor: 'rgb(90, 160, 227)',
  borderRadius: '0px 0px 10px 10px',
  padding: '10px 25px 10px 10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: 'white',
  fontSize: '1rem',
  fontWeight: 'normal',
  flexDirection: 'column',
  width: '100%',
};

const buttonFooterStyle = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgb(30, 58, 138)',
  padding: '7px 27px',
  borderRadius: '25px',
  fontWeight: 'bold',
  color: 'white',
  fontSize: '1rem'
};

const Home = () => {
  return (
    <div style={{ maxWidth: '1200px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header>
        <img src={logo} alt="Logo" className="app-logo" style={{ marginRight: '10px', marginLeft: '-15px' }} />
        <div className="header-text-container">
          <h1 style={{ textAlign: 'left' }}>Tipo de crédito</h1>
          <p>Selecciona la opción de financiamiento que necesitas</p>
        </div>
      </header>

      <main>
        <div className="home-button-container">
          {/* Botón Financiamiento */}
          <Link to="/financiarWizard" style={{ textDecoration: 'none', display: 'block', width: '100%' }}>
            <div style={buttonStyle}>
              <div className="card-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="card-top-text" style={textContainerStyle}>
                  <h1 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'rgb(30, 58, 138)',
                    marginBottom: '10px',
                    textAlign: 'left'
                  }}>
                    Financiamiento
                  </h1>
                  <p style={{ fontSize: '1rem', color: 'rgb(0, 0, 0)', margin: '0px', textAlign: 'left' }}>
                    Financiamos hasta el 80% del valor de tu vehículo
                  </p>
                </div>
                <img src={financiar} alt="Financiamiento" style={imageStyle} />
              </div>
              <div style={footerStyle}>
                <p style={{ margin: '18px' }}>¡No lo pienses más, tu nuevo auto está cada vez más cerca!</p>
                <div style={buttonFooterStyle}>
                  <span>CONTINUAR</span>
                  <span style={{ fontSize: '1.5rem', marginLeft: '10px' }}></span>
                </div>
              </div>
            </div>
          </Link>

          {/* Botón RE - Financiamiento */}
          <Link to="/refinanciarWizard" style={{ textDecoration: 'none', display: 'block', marginTop: '25px' }}>
            <div style={buttonStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={textContainerStyle}>
                  <h1 style={{
                    fontSize: '1.35rem',
                    fontWeight: 'bold',
                    color: 'rgb(30, 58, 138)',
                    marginBottom: '10px',
                    textAlign: 'left'
                  }}>
                    RE - Financiamiento
                  </h1>
                  <p style={{ fontSize: '1rem', color: 'rgb(0, 0, 0)', margin: '0px', textAlign: 'left' }}>
                    Baja la cuota de tu crédito automotriz aquí ¡100% online!
                  </p>
                </div>
                <img src={refinanciar} alt="Refinanciamiento" style={imageStyle} />
              </div>
              <div style={footerStyle}>
                <p style={{ margin: '18px' }}>¡No pierdas tiempo, renueva tu auto con la mejor cuota!</p>
                <div style={buttonFooterStyle}>
                  <span>CONTINUAR</span>
                  <span style={{ fontSize: '1.5rem', marginLeft: '10px' }}></span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Botón Atrás */}
        <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center' }}>
          <input type="button" className="atrasButton" value="Atrás" />
        </div>
      </main>
    </div>
  );
};

export default Home;