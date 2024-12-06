import React, { useEffect, useState } from 'react';
import './TurtlePass.css';
import Turtle from './assets/turtle.png';

const TurtlePass = () => {
  const [turtlePositions, setTurtlePositions] = useState([]);
  const [isEventActive, setIsEventActive] = useState(true);

  // Generate random positions for the turtles
  useEffect(() => {
    const positions = [];
    for (let i = 0; i < 7; i++) {
      const left = Math.random() * 100; // Random left position (0% to 100%)
      const top = Math.random() * 80;  // Random top position (0% to 80%)
      positions.push({ left: `${left}vw`, top: `${top}vh` });
    }
    setTurtlePositions(positions);

    // Prevent user interaction during turtle event
    document.body.style.pointerEvents = 'none'; // Disable interactions

    // Set a timer to end the event after a while (e.g., 12 seconds)
    const timer = setTimeout(() => {
      setIsEventActive(false); // End the event after 12 seconds
      document.body.style.pointerEvents = 'auto'; // Enable interactions
    }, 150000); // 12-second delay before event ends

    return () => {
      clearTimeout(timer); // Cleanup the timer
      document.body.style.pointerEvents = 'auto'; // Ensure interactions are enabled after cleanup
    };
  }, []);

  return (
    <div className="turtle-event">
      {/* Background overlay */}
      {isEventActive && <div className="overlay"></div>}

      {/* Message at the top */}
      {isEventActive && (
        <div className="message">
          Wait for the passing turtles...
        </div>
      )}

      <div className="turtle-container">
        {turtlePositions.map((position, index) => (
          <img
            key={index}
            className={`turtle ${index === 0 ? 'big' : index < 3 ? 'medium' : 'small'} ${index > 4 ? 'smaller' : ''}`}
            src={Turtle}
            alt={`Turtle ${index + 1}`}
            style={{
              left: position.left,
              top: position.top
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TurtlePass;
