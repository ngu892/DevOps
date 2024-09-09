import React from 'react';
import { Link } from 'react-router-dom';

function RenovationManagement() {
  return (
    <div>
      <h2>Renovation Management</h2>
      <p>Book renovation time slots here.</p>
      <ul>
        <li>View available time slots</li>
        <li>Select and book a time</li>
      </ul>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default RenovationManagement;
