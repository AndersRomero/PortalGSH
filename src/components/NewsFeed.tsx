
import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import { Noticia } from '../types';

const NewsFeed: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/noticias');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Noticia[] = await response.json();
        setNoticias(data);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("No se pudieron cargar las noticias.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-5">Cargando noticias...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-5 text-center">{error}</div>;
  }

  if (noticias.length === 0) {
    return <div className="text-center mt-5">No hay noticias disponibles.</div>;
  }

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
