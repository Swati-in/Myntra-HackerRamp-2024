import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TrendCard from './TrendCard';
import './SwipeableContainer.css';

const Container = styled.div.attrs({ className: 'container' })``;

const Heading = styled.h1.attrs({ className: 'heading', 'data-text': 'Swipe & Style' })``;

const ButtonContainer = styled.div.attrs({ className: 'button-container' })``;

const SwipeButton = styled.button.attrs({ className: 'swipe-button' })``;

const EndCardContainer = styled.div.attrs({ className: 'end-card-container' })``;

const EndCardText = styled.p.attrs({ className: 'end-card-text' })``;

const EndCardButton = styled.button.attrs({ className: 'end-card-button' })``;

const SwipeableContainer = ({ trends, onLike, onDislike }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const navigate = useNavigate();

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setSwipeDirection(null);
    }, 500);
  };

  const handleSwipeLeft = () => {
    handleSwipe('left');
    onDislike(trends[currentIndex]);
  };

  const handleSwipeRight = () => {
    handleSwipe('right');
    onLike(trends[currentIndex]);
  };

  const handleEndCardClick = () => {
    navigate('/liked-trends');
  };

  return (
    <Container>
      <Heading>Swipe & Style</Heading>
      {currentIndex < trends.length ? (
        <>
          <TrendCard trend={trends[currentIndex]} swipeDirection={swipeDirection} />
          <ButtonContainer>
            <SwipeButton onClick={handleSwipeLeft}>Swipe Left</SwipeButton>
            <SwipeButton onClick={handleSwipeRight}>Swipe Right</SwipeButton>
          </ButtonContainer>
        </>
      ) : (
        <EndCardContainer onClick={handleEndCardClick}>
          <img src="/images/endcardImage.jpg" alt="End Card Background" className="end-card-image" />
          
          <EndCardText>These are the trends you liked. Shop more like this.</EndCardText> 
          
        </EndCardContainer>
      )}
      <EndCardButton onClick={handleEndCardClick}>See Liked Trends</EndCardButton>
    </Container>
  );
};

export default SwipeableContainer;
