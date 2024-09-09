import React, { useState } from 'react';
import '../styles/RenovationManagement.css'

function RenovationManagement() {
  return (
    <div className="renovation-management">
      <div className="headerContainer">
        <h1>Renovation Management</h1>
        <p>Book your renovation slots easily.</p>
      </div>
      <div className="contentContainer">
        <h2>Available Time Slots</h2>
        <ul className="timeSlots">
          <li>Monday: 10 AM - 12 PM</li>
          <li>Tuesday: 2 PM - 4 PM</li>
          <li>Wednesday: 1 PM - 3 PM</li>
        </ul>
        <p>You can select and book a time that suits you.</p>
      </div>
    </div>
  );
}

export default RenovationManagement;
