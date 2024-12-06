import React, { useState, useEffect, useRef } from 'react';  
import { useNavigate } from 'react-router-dom';  
import './Navbar.css';

// Import the splash sound
import splashSound from './assets/Splash.mp3';

const Navbar = () => {
  const [buttonPosition, setButtonPosition] = useState({ left: '50%', top: '50%' });
  const [title, setTitle] = useState('');
  const [hovered, setHovered] = useState(false);

  const navigate = useNavigate();
  const userInteracted = useRef(false); // Track if the user interacted with the page

  // Function to play splash sound
  const playSplashSound = () => {
    if (userInteracted.current) {
      const sound = new Audio(splashSound);
      sound.play();
    }
  };

  // Generate random Chinese characters
  const randomChineseCharacters = () => {
    const characters = '汉字漢字文字學習书法简繁體字';
    return Array.from({ length: 5 }, () => 
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
  };

  // Change title every 500ms when not hovered
  useEffect(() => {
    const interval = setInterval(() => {
      if (!hovered) {
        setTitle(randomChineseCharacters());
      }
    }, 500);

    return () => clearInterval(interval);
  }, [hovered]);

  // Handle mouse move event to change button position
  const handleMouseMove = (e) => {
    const randomOffsetX = Math.random() * 100 - 50;
    const randomOffsetY = Math.random() * 100 - 50;
    const button = document.querySelector('.navbar-button');
    const buttonRect = button.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    setButtonPosition({
      left: `${e.clientX + randomOffsetX - buttonCenterX}px`,
      top: `${e.clientY + randomOffsetY - buttonCenterY}px`,
    });

    playSplashSound(); // Play sound when mouse moves
  };

  // Handle button click to navigate
  const handleClick = () => {
    navigate('/another-page');
  };

  // Handle user interaction (first interaction, such as a click)
  const handleUserInteraction = () => {
    userInteracted.current = true;
  };

  // Add mouse move listener to update button position
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleUserInteraction); // Track user click interaction

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleUserInteraction); // Clean up on unmount
    };
  }, []);

  return (
    <nav className="navbar">
      <div 
        className="navbar-brand"
        onMouseEnter={() => { 
          setHovered(true);
          playSplashSound(); // Play sound when hovering over the brand
        }}
        onMouseLeave={() => setHovered(false)}
      >
        {hovered ? 'OceanMonems' : title}
      </div>
      <button
        className="navbar-button"
        onClick={handleClick}
        style={{ left: buttonPosition.left, top: buttonPosition.top }}
      >
        ?
      </button>
    </nav>
  );
};

export default Navbar;
