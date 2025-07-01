
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Portal de Noticias</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Noticias</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/apps">Aplicaciones</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
