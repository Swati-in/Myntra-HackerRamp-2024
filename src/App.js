import React, { useState } from 'react';
import SwipeableContainer from './components/SwipeableContainer';
import LikedTrendsPage from './components/LikedTrendsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const initialTrends = [
  { name: 'Flared Jeans', image: process.env.PUBLIC_URL + '/images/image1.jpeg' },
  { name: 'Bodycon Dresses', image: process.env.PUBLIC_URL + '/images/image2.jpeg' },
  { name: 'Chunky Long Boots', image: process.env.PUBLIC_URL + '/images/image3.jpeg' },
  { name: 'Oversized Sweater', image: process.env.PUBLIC_URL + '/images/image4.jpeg' },
  // Add more trend data
];

const App = () => {
  const [likedTrends, setLikedTrends] = useState([]);

  const handleLike = (trend) => {
    setLikedTrends((prevLikedTrends) => [...prevLikedTrends, trend]);
  };

  const handleDislike = (trend) => {
    console.log(`Disliked: ${trend.name}`);
  };

  const handleShowRelated = (trend) => {
    console.log(`Show related trends for: ${trend.name}`);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<SwipeableContainer
            trends={initialTrends}
            onLike={handleLike}
            onDislike={handleDislike}
            onShowRelated={handleShowRelated}
          />}
        />
        <Route
          path="/liked-trends"
          element={<LikedTrendsPage likedTrends={likedTrends} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
