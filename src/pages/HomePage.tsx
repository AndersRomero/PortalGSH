
import React from 'react';
import NewsFeed from '../components/NewsFeed';

const HomePage: React.FC = () => {
  return (
    <div>
      <div>
        <h1 className="text-center my-4">Últimas Noticias</h1>
        <NewsFeed />
      </div>


    </div>
  );
};

export default HomePage;
