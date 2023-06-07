import React, { useState, useEffect } from 'react';
import './elevator.css';

const Elevator = () => {
  const [currentFloor, setCurrentFloor] = useState(1);
  const [destinationFloor, setDestinationFloor] = useState(1);
  const [direction, setDirection] = useState('');
  const [moving, setMoving] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState('');
  const [inputFloor, setInputFloor] = useState('');

  const handleFloorSelection = (floor) => {
    if (!moving) {
      setDestinationFloor(floor);
    }
  };

  const handleDirectionChange = (newDirection) => {
    setDirection(newDirection);
  };

  const handleMove = () => {
    if (!moving) {
      setMoving(true);
      setArrivalMessage('');
    }
  };

  const handleInputFloor = (e) => {
    setInputFloor(e.target.value);
  };

  const handleCallElevator = () => {
    if (!moving) {
      const inputFloorNumber = parseInt(inputFloor);
      if (inputFloorNumber >= 1 && inputFloorNumber <= 10) {
        setDestinationFloor(inputFloorNumber);
        setInputFloor('');
        setMoving(true);
        setArrivalMessage(`El elevador está en camino al piso ${inputFloorNumber}.`);
      } else {
        alert('Ingresa un piso válido (1-10).');
      }
    }
  };

  useEffect(() => {
    if (moving) {
      const timer = setInterval(() => {
        setCurrentFloor((prevFloor) => {
          if (prevFloor < destinationFloor) {
            return prevFloor + 1;
          } else if (prevFloor > destinationFloor) {
            return prevFloor - 1;
          } else {
            setMoving(false);
            clearInterval(timer);
            setArrivalMessage(`Llego al piso ${destinationFloor}!`);
            return prevFloor;
          }
        });
      }, 1000);
    }
  }, [moving, destinationFloor]);

  const renderDirectionButton = (buttonDirection, buttonText) => {
    return (
      <button
        className={`direction-button ${direction === buttonDirection ? 'selected' : ''}`}
        onClick={() => handleDirectionChange(buttonDirection)}
        disabled={moving}
      >
        {buttonText}
      </button>
    );
  };

  return (
    <div className="elevator-wrapper">
      <h2>Elevador</h2>
      <div className="button-container">
        <div className="button-wrapper">
          {[...Array(10)].map((_, index) => (
            <button
              key={index}
              onClick={() => handleFloorSelection(index + 1)}
              className={currentFloor === (index + 1) ? 'current-floor-button' : ''}
              disabled={moving}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className={`elevator-box ${moving ? 'moving' : ''}`}>
          <p className="floor-display">{moving ? currentFloor : destinationFloor}</p>
        </div>
        <div className="button-wrapper">
          <label>Piso actual en el que estas:</label>
          <input type="number" value={inputFloor} onChange={handleInputFloor} disabled={moving} />
          <button onClick={handleCallElevator} disabled={moving}>Llamar Elevador</button>
        </div>
        <div className="button-wrapper">
          {renderDirectionButton('up', '↑')}
          {renderDirectionButton('down', '↓')}
        </div>
      </div>
      <div className="button-wrapper">
        <button onClick={handleMove} disabled={moving}>Ok</button>
      </div>
      <p className="current-floor">Estás en el piso: {currentFloor}</p>
      {arrivalMessage && <p className="arrival-message">{arrivalMessage}</p>}
    </div>
  );
};

export default Elevator;
