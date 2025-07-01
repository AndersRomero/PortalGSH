
import React from 'react';
import NewsCard from './NewsCard';
import newsData from '../data/noticias.json';

const NewsFeed: React.FC = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        {newsData.map(news => (
          <div className="col-md-4" key={news.id}>
            <NewsCard 
              title={news.titulo}
              summary={news.resumen}
              imageUrl={news.imagenURL}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
