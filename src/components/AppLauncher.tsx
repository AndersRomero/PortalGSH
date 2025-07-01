
import React from 'react';
import appData from '../data/aplicaciones.json';

const AppLauncher: React.FC = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        {appData.map(app => (
          <div className="col-md-3 text-center mb-4" key={app.nombre}>
            <a href={app.enlaceURL} target="_blank" rel="noopener noreferrer" className="d-block">
              <img src={app.iconoURL} alt={app.nombre} width="80" />
              <p>{app.nombre}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppLauncher;
