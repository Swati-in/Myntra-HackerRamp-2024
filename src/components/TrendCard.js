import React from 'react';
import './TrendCard.css';

const TrendCard = ({ trend, swipeDirection }) => {
  return (
    <div className={`card ${swipeDirection ? swipeDirection : ''}`}>
      <img className="image" src={trend.image} alt={trend.name} />
      <div className="info">
        <h2 className="trend-name">{trend.name}</h2>
      </div>
    </div>
  );
};

export default TrendCard;
