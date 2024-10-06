import React, { useState } from 'react';
import '../styles/ParkingManagement.css';

function ParkingManagement() {
  
  const [licensePlate, setLicensePlate] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [availableSpaces, setAvailableSpaces] = useState(50);  // number of parking place is 50 at first
  const [notification, setNotification] = useState('');

  // enter 
  const handleLicensePlateChange = (e) => {
    setLicensePlate(e.target.value);
  };

  // pay
  const handlePayment = () => {
    if (licensePlate === '') {
      setNotification('Please enter your license plate number.');
      return;
    }

    if (availableSpaces <= 0) {
      setNotification('No parking spaces available.');
      return;
    }

    setIsPaid(true);
    setAvailableSpaces(availableSpaces - 1);
    setNotification(`Payment successful! Your license plate: ${licensePlate}`);
  };

  return (
    <div className="parking-management">
      <div className="headerContainer">
        <h1>Parking Management</h1>
        <p>Manage your parking space easily and efficiently.</p>
      </div>

      <div className="contentContainer">
        <h2>Enter License Plate Information</h2>
        <input 
          type="text" 
          value={licensePlate} 
          placeholder="Enter License Plate"
          onChange={handleLicensePlateChange}
        />
        <button onClick={handlePayment}>Pay for Parking</button>

        {isPaid && <p>Payment successful for {licensePlate}!</p>}

        <h2>Available Spaces: {availableSpaces}</h2>
      </div>

      <div className="notificationContainer">
        <h2>Important Notifications</h2>
        <p>{notification}</p>
      </div>
    </div>
  );
}

export default ParkingManagement;
