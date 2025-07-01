
import React from 'react';
import NewsCard from './NewsCard';
import newsData from '../data/noticias.json';
import { Noticia } from '../types';

const NewsFeed: React.FC = () => {
  const noticias: Noticia[] = newsData;

  return (
    <div className="container mt-4">
      <div className="row">
        {noticias.map(noticia => (
          <div className="col-md-4 mb-4" key={noticia.id}>
            <NewsCard 
              noticia={noticia}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
