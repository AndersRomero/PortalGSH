import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import appData from '../data/aplicaciones.json';

interface AppItem {
  nombre: string;
  iconoURL: string;
  enlaceURL: string;
  grupo: string;
}

const AppsPage: React.FC = () => {
  const groupedApps: { [key: string]: AppItem[] } = appData.reduce((acc, app) => {
    if (!acc[app.grupo]) {
      acc[app.grupo] = [];
    }
    acc[app.grupo].push(app);
    return acc;
  }, {} as { [key: string]: AppItem[] });

  const starkApps = groupedApps['Stark'] || [];
  const docdataApps = groupedApps['Docdata'] || [];
  const novasoftApps = groupedApps['Novasoft'] || [];
  const otherApps = groupedApps['Otros'] || [];

  const renderAppCards = (apps: AppItem[], title: string, colSize: number = 3) => (
    apps.length > 0 && (
      <div className="mb-4">
        <h3 className="mb-3" style={{ color: '#0a2e4a' }}>{title}</h3>
        <Row className="g-3">
          {apps.map((app, index) => (
            <motion.div 
              className="col-xs-6 col-sm-4 col-md-{colSize} h-100"
              key={app.nombre}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <a href={app.enlaceURL} target="_blank" rel="noopener noreferrer" className="text-decoration-none h-100">
                <Card className="h-100 text-center app-card">
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center p-3" style={{ backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                    <img 
                      src={app.iconoURL} 
                      alt={app.nombre} 
                      className="img-fluid mb-2" 
                      style={{ maxWidth: '80px', height: 'auto' }}
                    />
                    <Card.Title className="mb-0 fw-bold" style={{ fontSize: '0.9rem', color: '#0a2e4a' }}>{app.nombre}</Card.Title>
                  </Card.Body>
                </Card>
              </a>
            </motion.div>
          ))}
        </Row>
      </div>
    )
  );

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-5" style={{ color: '#0a2e4a' }}>Nuestras Aplicaciones</h1>

      <Row className="mb-4">
        <Col md={6}>
          {renderAppCards(starkApps, 'Aplicaciones STARK', 4)}
        </Col>
        <Col md={6}>
          {renderAppCards(docdataApps, 'Aplicaciones DOCDATA', 4)}
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          {renderAppCards(novasoftApps, 'Aplicaciones NOVASOFT', 4)}
        </Col>
        <Col md={6}>
          {renderAppCards(otherApps, 'Otras Aplicaciones', 4)}
        </Col>
      </Row>
    </Container>
  );
};

export default AppsPage;