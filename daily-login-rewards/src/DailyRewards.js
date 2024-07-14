// DailyRewards.js
import React, { useState, useEffect } from 'react';
import './DailyRewards.css';
import ConfettiComponent from './ConfettiComponent';

const rewards = [
  { name: '10% Cashback', image: './images/image 1.jpg' },
  { name: '15% Discount', image: './images/image 3.jpg' },
  { name: '100/- Off', image: './images/image 6.jpg' },
  { name: 'MynCash', image: './images/image 5.jpg' },
  { name: 'Super Coins', image: './images/image 2.jpg' },
  { name: 'Flat 20% Off', image: './images/image 4.jpg' },
  { name: 'Myntra Credit', image: './images/image 8.jpg' },
  { name: '5% Discount', image: './images/image 7.jpg' },
  // Add more rewards as needed
];

const DailyRewards = () => {
  const [checkedInDays, setCheckedInDays] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [missedDays, setMissedDays] = useState(0);
  const [lastCheckIn, setLastCheckIn] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Clear local storage on component mount to reset check-ins
    localStorage.clear();

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const startDay = new Date(currentYear, currentMonth, 1);
    const endDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = endDay.getDate();

    const daysArray = Array.from({ length: totalDays }, (_, index) => index + 1);
    setDaysInMonth(daysArray);

    const dayNumber = today.getDate();
    setCurrentDay(dayNumber);

    // Calculate missed days
    const lastCheckInTime = localStorage.getItem('lastCheckIn');
    if (lastCheckInTime) {
      setLastCheckIn(new Date(lastCheckInTime));
    }

    const storedCheckedInDays = JSON.parse(localStorage.getItem('checkedInDays')) || [];
    setCheckedInDays(storedCheckedInDays);

    const missed = dayNumber - storedCheckedInDays.length - 1;
    setMissedDays(missed > 0 ? missed : 0);
  }, []);

  const handleCheckIn = (day) => {
    const now = new Date();
    if (checkedInDays.length === 0 && day !== 1) {
      alert('You need to check in for Day 1 first.');
      return;
    }

    if (day <= currentDay && !checkedInDays.includes(day)) {
      if (!lastCheckIn || (now - lastCheckIn) >= 24 * 60 * 60 * 1000) {
        const updatedDays = [...checkedInDays, day];
        setCheckedInDays(updatedDays);
        localStorage.setItem('checkedInDays', JSON.stringify(updatedDays));
        setSelectedReward(rewards[(day - 1) % rewards.length]);  // Rotate rewards
        setShowModal(true);
        setShowConfetti(true); // Show confetti
        setLastCheckIn(now);
        localStorage.setItem('lastCheckIn', now);

        // Hide confetti after animation is done
        setTimeout(() => {
          setShowConfetti(false);
        }, 500); // Adjust this timeout as necessary
      } else {
        alert('You can only check in once every 24 hours.');
      }
    }
  };

  return (
    <div className="daily-rewards">
      {showConfetti && <ConfettiComponent />}
      <div className="header">
        <h1 className="heading">Daily Login Rewards</h1>
        <button className="show-rewards-button" onClick={() => setShowRewardsModal(true)}>
          Show Claimed Rewards
        </button>
      </div>
      <div className="status-bar">
        <p>Missed Days: {missedDays}</p>
      </div>
      <div className="rewards-grid">
        {daysInMonth.map(day => (
          <div
            key={day}
            className={`reward-day ${checkedInDays.includes(day) ? 'checked-in' : ''} ${day > currentDay ? 'future-day' : ''}`}
            onClick={() => handleCheckIn(day)}
          >
            <img src={rewards[(day - 1) % rewards.length].image} alt={rewards[(day - 1) % rewards.length].name} />
            <div className="reward-detail">{rewards[(day - 1) % rewards.length].name}</div>
            <div>Day {day}</div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <p>Congratulations! You claimed: {selectedReward.name}</p>
            <img src={selectedReward.image} alt={selectedReward.name} />
          </div>
        </div>
      )}
      {showRewardsModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowRewardsModal(false)}>&times;</span>
            <h2>Claimed Rewards</h2>
            <div className="claimed-rewards-grid">
              {checkedInDays.map(day => (
                <div key={day} className="claimed-reward">
                  <img src={rewards[(day - 1) % rewards.length].image} alt={rewards[(day - 1) % rewards.length].name} />
                  <div className="claimed-reward-details">
                    <div className="reward-detail">{rewards[(day - 1) % rewards.length].name}</div>
                    <div>Day {day}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyRewards;
