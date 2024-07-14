//LikedTrendsPage.js
import React from 'react';
import TrendCard from './TrendCard'; // Adjust the path as needed
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh; /* Ensure the container takes the full height of the viewport */
  background: url(${process.env.PUBLIC_URL + '/images/bgimage2.jpg'}) no-repeat center center fixed;
  background-size: cover; /* Ensure the background image covers the entire container */
  padding: 20px;
`;

const Heading = styled.h1`
  margin-bottom: 20px;
  font-size: 45px;
  text-align: center;
  width: 100%;
  font-family: "Bungee Spice", sans-serif;
  font-weight: 400;
  color:#ffffff;  
  
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

const LikedTrend = styled.div`
  margin: 10px 0;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TrendImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 300px;
  border-radius: 10px;
`;

const LikedTrendsPage = ({ likedTrends }) => {
  return (
    <PageContainer>
      <Heading>Liked Trends</Heading>
      <Container>
        {likedTrends.map((trend, index) => (
          <TrendCard key={index} trend={trend} swipeDirection={null} />
        ))}
      </Container>
    </PageContainer>
  );
};

export default LikedTrendsPage;
