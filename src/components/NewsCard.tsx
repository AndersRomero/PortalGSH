
import React from 'react';

interface NewsCardProps {
  title: string;
  summary: string;
  imageUrl: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, summary, imageUrl }) => {
  return (
    <div className="card mb-3">
      <img src={imageUrl} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{summary}</p>
      </div>
    </div>
  );
};

export default NewsCard;
