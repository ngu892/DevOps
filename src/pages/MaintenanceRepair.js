import React, { useState, useEffect } from 'react';

const MaintenanceRepair = () => {
  const [requests, setRequests] = useState([
    { id: 1, issue: 'Leaking pipe', date: '2024-09-10', status: 'Pending' },
    { id: 2, issue: 'Broken door lock', date: '2024-09-11', status: 'In Progress' },
    { id: 3, issue: 'Malfunctioning air conditioner', date: '2024-09-12', status: 'Completed' }
  ]);

  const [newRequest, setNewRequest] = useState('');
  const [pendingCount, setPendingCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const pending = requests.filter(request => request.status === 'Pending').length;
    const inProgress = requests.filter(request => request.status === 'In Progress').length;
    const completed = requests.filter(request => request.status === 'Completed').length;

    setPendingCount(pending);
    setInProgressCount(inProgress);
    setCompletedCount(completed);
  }, [requests]);

  const updateStatus = (id, newStatus) => {
    const updatedRequests = requests.map(request =>
      request.id === id ? { ...request, status: newStatus } : request
    );
    setRequests(updatedRequests);
  };

  const handleSubmitRequest = () => {
    if (newRequest) {
      const newReq = {
        id: requests.length + 1,
        issue: newRequest,
        date: new Date().toLocaleDateString(),
        status: 'Pending'
      };
      setRequests([...requests, newReq]);
      setNewRequest('');
    }
  };

  return (
    <div>
      <h2>Maintenance and Repair Management</h2>
      <p>Handles daily maintenance and repair requests for the property, tracks the progress of issue resolution.</p>

      <table>
        <thead>
          <tr>
            <th>Issue</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id}>
              <td>{request.issue}</td>
              <td>{request.date}</td>
              <td>{request.status}</td>
              <td>
                {request.status === 'Completed' ? (
                  <button disabled>Completed</button>
                ) : (
                  <>
                    <button onClick={() => updateStatus(request.id, 'In Progress')}>Start</button>
                    <button onClick={() => updateStatus(request.id, 'Completed')}>Complete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h3>Pending Requests: {pendingCount}</h3>
        <h3>In Progress Requests: {inProgressCount}</h3>
        <h3>Completed Requests: {completedCount}</h3>
      </div>

      <div>
        <h3>Submit a New Maintenance Request</h3>
        <input
          type="text"
          placeholder="Enter issue description"
          value={newRequest}
          onChange={(e) => setNewRequest(e.target.value)}
        />
        <button onClick={handleSubmitRequest}>Submit</button>
      </div>
    </div>
  );
};

export default MaintenanceRepair;
