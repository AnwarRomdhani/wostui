import React, { useEffect, useState } from 'react';
import './WhalePass.css'; // You can create a new CSS file for this
import Whale from './assets/Whale.png'; // Assuming you have a whale image

const WhalePass = () => {
  const [whalePositions, setWhalePositions] = useState([]);
  const [isEventActive, setIsEventActive] = useState(true);

  // Generate random vertical positions for the whales
  useEffect(() => {
    const positions = [];
    for (let i = 0; i < 1; i++) {  // Only one whale will pass
      const left = Math.random() * 100; // Random horizontal position (0% to 100%)
      positions.push({ left: `${left}vw`, top: '100vh' }); // Start at the bottom
    }
    setWhalePositions(positions);

    // Prevent user interaction during whale event
    document.body.style.pointerEvents = 'none'; // Disable interactions

    // Set a timer to end the event after a while (e.g., 12 seconds)
    const timer = setTimeout(() => {
      setIsEventActive(false); // End the event after 12 seconds
      document.body.style.pointerEvents = 'auto'; // Enable interactions
    }, 12000); // 12-second delay before event ends

    return () => {
      clearTimeout(timer); // Cleanup the timer
      document.body.style.pointerEvents = 'auto'; // Ensure interactions are enabled after cleanup
    };
  }, []);

  return (
    <div className="whale-event">
      {/* Background overlay */}
      {isEventActive && <div className="overlay"></div>}

      {/* Message at the top */}
      {isEventActive && (
        <div className="message">
          Wait for the passing whale...
        </div>
      )}

      <div className="whale-container">
        {whalePositions.map((position, index) => (
          <img
            key={index}
            className={`whale ${index === 0 ? 'big' : ''}`}
            src={Whale}
            alt={`Whale ${index + 1}`}
            style={{
              left: position.left,
              top: position.top,
              animation: `whale-move-up 12s ease-in-out forwards`, // Apply animation
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WhalePass;
