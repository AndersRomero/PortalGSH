
import React from 'react';
import { Noticia } from '../types';

interface NewsCardProps {
  noticia: Noticia;
}

const NewsCard: React.FC<NewsCardProps> = ({ noticia }) => {
  return (
    <div className="card h-100">
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
