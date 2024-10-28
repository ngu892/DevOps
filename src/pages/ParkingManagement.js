import React, { useState } from 'react';
import '../styles/ParkingManagement.css';
import { useNavigate } from 'react-router-dom';

function ParkingManagement() {
  const [licensePlate, setLicensePlate] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [availableSpaces, setAvailableSpaces] = useState(50);
  const [notification, setNotification] = useState('');
  const [parkedCars, setParkedCars] = useState({});
  const [showRecords, setShowRecords] = useState(false); 

  const navigate = useNavigate();

  const handleLicensePlateChange = (e) => {
    const input = e.target.value.toUpperCase();
    
    const licensePlatePattern = /^[A-Z]{2,3}\d{1,4}$/;

    
    if (licensePlatePattern.test(input) || input === '' || /^[A-Z]{0,3}\d{0,4}$/.test(input)) {
      setLicensePlate(input);
      setNotification('');  
    } else {
      setNotification('Invalid license plate format. Expected format: 2-3 letters followed by 1-4 numbers.');
    }
  };

  const handleParking = () => {
    if (licensePlate === '') {
      setNotification('Please enter your license plate number.');
      return;
    }

    if (availableSpaces <= 0) {
      setNotification('No parking spaces available.');
      return;
    }

    if (parkedCars[licensePlate]) {
      setNotification('Car is already parked.');
      return;
    }

    const startTime = new Date();
    setParkedCars({
      ...parkedCars,
      [licensePlate]: { startTime, cost: 0 }
    });
    setAvailableSpaces(availableSpaces - 1);
    setNotification('Car parked successfully!');
  };

  const handleExit = () => {
    if (!parkedCars[licensePlate]) {
      setNotification('This car is not parked here.');
      return;
    }

    const exitTime = new Date();
    const startTime = parkedCars[licensePlate].startTime;
    const parkedDurationMinutes = Math.floor((exitTime - startTime) / 60000);

    let cost = 0;
    if (parkedDurationMinutes > 30) {
      const hours = Math.ceil((parkedDurationMinutes - 30) / 60);
      cost = Math.min(hours * 5, 30);
    }

    setAvailableSpaces(availableSpaces + 1);
    setParkedCars(prevCars => ({
      ...prevCars,
      [licensePlate]: { ...prevCars[licensePlate], cost }
    }));

    setNotification(`Please pay $${cost}.`);

    if (cost > 0) {
      navigate('/pay', { state: { cost, licensePlate } });
    }
  };

  const handleViewRecords = () => {
    setShowRecords(!showRecords);
  };

  return (
    <div className="parking-management">
      <div className="headerContainer">
        <h1>Parking Management</h1>
        <p>Manage your parking space easily</p>
      </div>

      <div className="contentContainer">
        <h2>Enter License Plate Information</h2>
        <input 
          type="text" 
          value={licensePlate} 
          placeholder="Enter License Plate"
          onChange={handleLicensePlateChange}
        />
        <button onClick={handleParking}>Park</button>
        <button onClick={handleExit}>Exit</button>
        <button onClick={handleViewRecords}>
          {showRecords ? 'Hide Records' : 'View Parking Records'}
        </button>

        <h2>Available Spaces: {availableSpaces}</h2>
      </div>

      <div className="notificationContainer">
        <h2>Important Notifications</h2>
        <p>{notification}</p>
      </div>

      {showRecords && (
        <div className="recordsContainer">
          <h3>Parking Records</h3>
          <ul>
            {Object.entries(parkedCars).map(([plate, details]) => (
              <li key={plate}>
                License Plate: {plate} | Parked Time: {details.startTime.toLocaleTimeString()} | Cost: ${details.cost}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ParkingManagement;
