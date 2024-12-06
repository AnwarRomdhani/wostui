import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import LandingPage from './Landingpage';
import TurtlePass from './TurtlePass';
import WhalePass from './WhalePass';
import AnotherPage from './AnotherPage';

// Import the splash sound effect
import splashSound from './assets/Splash.mp3'; 

function App() {
  const [isTurtleEvent, setIsTurtleEvent] = useState(false);
  const [isWhaleEvent, setIsWhaleEvent] = useState(false);

  useEffect(() => {
    const triggerEvent = () => {
      if (!isTurtleEvent && !isWhaleEvent) {
        const eventType = Math.random() < 0.5 ? 'turtle' : 'whale';
        
        if (eventType === 'turtle') {
          setIsTurtleEvent(true);
          setTimeout(() => {
            setIsTurtleEvent(false);
          }, 5000);
        } else {
          setIsWhaleEvent(true);
          setTimeout(() => {
            setIsWhaleEvent(false);
          }, 12000);
        }
      }
    };

    const timeout = setTimeout(() => {
      triggerEvent();
    }, Math.random() * 10000 + 5000);

    return () => clearTimeout(timeout);
  }, [isTurtleEvent, isWhaleEvent]);

  // Function to play splash sound on hover
  const playSplashSound = () => {
    const sound = new Audio(splashSound);
    sound.play();
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/another-page" element={<AnotherPage />} />
      </Routes>

      {isTurtleEvent && <TurtlePass />}
      {isWhaleEvent && <WhalePass />}

      {/* Trigger splash sound on hover for the entire page or specific elements */}
      <div 
        className="hover-area" 
        onMouseEnter={playSplashSound} // Play sound on hover
        style={{ width: '100%', height: '100vh' }}  // Can be styled as needed
      >
        Hover over this area to hear the splash!
      </div>
    </Router>
  );
}

export default App;
