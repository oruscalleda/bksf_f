import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
    return (
        <>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Financiar">Financiar</Link>
            </li>
            <li>
              <Link to="/Refinanciar">Refinanciar</Link>
            </li>
          </ul>
        </nav>
  
        <Outlet />
      </>
    );
  }
  
  export default Layout;