
import React from 'react';
import { Noticia } from '../types';

interface NewsCardProps {
  noticia: Noticia;
  onClick: (noticia: Noticia) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ noticia, onClick }) => {
  return (
    <div className="card h-100" onClick={() => onClick(noticia)} style={{ cursor: 'pointer' }}>
      {noticia.imagen && (
        <img src={noticia.imagen} className="card-img-top" alt={noticia.titulo} style={{ height: '180px', objectFit: 'cover' }} />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{noticia.titulo}</h5>
        <p className="card-text flex-grow-1">{noticia.contenido}</p>
        <p className="card-text">
          <small className="text-muted">Por: {noticia.autor}</small>
        </p>
        <p className="card-text">
          <small className="text-muted">{new Date(noticia.fecha).toLocaleDateString()}</small>
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
