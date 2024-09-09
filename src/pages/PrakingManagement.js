import React, { useState } from 'react';
import '../styles/ParkingManagement.css'

function ParkingManagement() {
  return (
    <div className="parking-management">
      <div className="headerContainer">
        <h1>Parking Management</h1>
        <p>Manage your parking space easily and efficiently.</p>
      </div>
      <div className="contentContainer">
        <ul className="featureList">
          <li>Pay for Parking</li>
          <li>Enter License Plate Information</li>
          <li>View Available Spaces</li>
        </ul>
      </div>
      <div className="notificationContainer">
        <h2>Important Notifications</h2>
        <p>Please check if your license plate is correctly entered to avoid issues.</p>
      </div>
    </div>
  );
}

export default ParkingManagement;
