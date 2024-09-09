import React from 'react';
import { Link } from 'react-router-dom';

function ParkingManagement() {
  return (
    <div>
      <h2>Parking Management</h2>
      <ul>
        <li>Pay for Parking</li>
        <li>Enter License Plate Information</li>
        <li>View Available Spaces</li>
      </ul>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default ParkingManagement;
