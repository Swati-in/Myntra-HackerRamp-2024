// ConfettiComponent.js
import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const ConfettiComponent = () => {
  useEffect(() => {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8']
    };

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 1.2,
        shapes: ['star']
      });

      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ['circle']
      });
    }

    shoot();
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  }, []);

  return null;
};

export default ConfettiComponent;
