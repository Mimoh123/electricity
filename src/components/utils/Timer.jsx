import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ initialTime = 20, onTimeEnd, onTimeUpdate }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const intervalRef = useRef(null);

  // Start the timer
  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          if (onTimeEnd) onTimeEnd(); // Call onTimeEnd when timer reaches 0
          return 0;
        }
        if (onTimeUpdate) onTimeUpdate(prevTime - 1); // Optional: call onTimeUpdate for each tick
        return prevTime - 1;
      });
    }, 1000);
  };

  // Stop the timer manually
  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  // Reset the timer
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTimeLeft(initialTime);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, [initialTime]);
  const formattedTime = String(timeLeft).padStart(2, '0');
  return (
    <div className='timer'>
      <h2 className='font-semibold'>
        <span className='font-normal'>Send code again: </span>00:
        {formattedTime}
      </h2>
      <div className='timer-actions'></div>
    </div>
  );
};

export default Timer;
