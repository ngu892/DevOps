import React, { useState } from 'react';
import { useMaintenance } from '../context/MaintenanceContext';
import forbiddenWords from '../assets/forbiddenWords'; 
import '../styles/MaintenanceRequest.css';

const MaintenanceRequest = () => {
  const [newRequest, setNewRequest] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { requests, addRequest } = useMaintenance();

  const containsForbiddenWords = (text) => {
    
    return forbiddenWords.some(word => text.toLowerCase().includes(word));
  };

  const handleSubmitRequest = () => {
    if (!newRequest.trim()) {
      setErrorMessage('Please enter a description for the issue.');
    } else if (containsForbiddenWords(newRequest)) {
      setErrorMessage('Your description contains inappropriate language. Please remove it.');
    } else {
      addRequest(newRequest);
      setNewRequest('');
      setErrorMessage('');
    }
  };

  return (
    <div className="maintenance-request-container">
      <h2>Your Maintenance Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Issue</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id}>
              <td>{request.issue}</td>
              <td>{request.date}</td>
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="submit-request">
        <input
          type="text"
          placeholder="Enter issue description"
          value={newRequest}
          onChange={(e) => setNewRequest(e.target.value)}
        />
        <button onClick={handleSubmitRequest}>Submit</button>
      </div>
      
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default MaintenanceRequest;
