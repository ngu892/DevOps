import React, { useState } from 'react';
import '../styles/ResidentFeedback.css';

function ResidentFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [newFeedback, setNewFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('Complaint');
  const [showHistory, setShowHistory] = useState(false); 
  const [selectedFeedback, setSelectedFeedback] = useState(null); 
  const [notifications, setNotifications] = useState([]); 
  const [loading, setLoading] = useState(false); 

 
  const generateManagerResponse = (feedbackText) => {
    
    if (feedbackText.toLowerCase().includes("leaking")) {
      return "Thank you for reporting the leak. Our maintenance team will be dispatched to your room shortly to address the issue.";
    } else if (feedbackText.toLowerCase().includes("noise")) {
      return "We appreciate your feedback on the noise issue. We will remind all tenants about the importance of keeping noise levels down, especially during quiet hours.";
    } else {
      return "Thank you for your feedback. Our team will review your report and follow up as soon as possible.";
    }
  };

  const handleFeedbackSubmit = () => {
    if (newFeedback.trim() === '') {
      alert("Feedback cannot be empty");
      return;
    }

    const newEntry = {
      text: newFeedback,
      type: feedbackType,
      timestamp: new Date(),
      status: 'Pending',
      managerResponse: "Awaiting manager response...", 
    };

    setFeedbackList([...feedbackList, newEntry]);
    setNewFeedback('');
    setFeedbackType('Complaint');

    
    setTimeout(() => {
      const managerResponse = generateManagerResponse(newEntry.text); 
      setFeedbackList(prevList => 
        prevList.map(fb => 
          fb.timestamp === newEntry.timestamp 
            ? { ...fb, status: 'Resolved', managerResponse }
            : fb
        )
      );
      setNotifications(prevNotifications => [...prevNotifications, `Your feedback "${newEntry.text}" has been resolved with a response from management.`]);
    }, 3000); 
  };

  return (
    <div className="resident-feedback">
      <div className="headerContainer">
        <h1>Resident Feedback & Complaints</h1>
        <p>Submit your feedback and complaints confidentially.</p>
      </div>

      <div className="feedbackContainer">
        <h2>Your Feedback and Complaints</h2>

        <div className="newFeedback">
          <select 
            value={feedbackType} 
            onChange={(e) => setFeedbackType(e.target.value)}
          >
            <option value="Complaint">Complaint</option>
            <option value="Suggestion">Suggestion</option>
            <option value="Other">Other</option>
          </select>

          <textarea
            value={newFeedback}
            onChange={(e) => setNewFeedback(e.target.value)}
            placeholder="Enter your feedback or complaint..."
          />
          <button onClick={handleFeedbackSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>

        {/* View History Button */}
        <button onClick={() => setShowHistory(!showHistory)} className="history-button">
          {showHistory ? 'Hide History' : 'View History'}
        </button>

        {/* History expansion area */}
        {showHistory && (
  <div className="historyList">
    <h3>Feedback History</h3>
    {feedbackList.length === 0 ? (
      <p>No feedback or complaints yet.</p>
    ) : (
      feedbackList.map((feedback, index) => (
        <div key={index} className="feedback-item">
          <p><strong>Type:</strong> {feedback.type}</p>
          <p><strong>Status:</strong> {feedback.status}</p>
          <small className="feedback-time">{feedback.timestamp.toString()}</small>
          <button onClick={() => setSelectedFeedback(feedback)}>View Details</button>
        </div>
      ))
    )}
  </div>
)}


        {/* Detailed feedback information display area */}
        {selectedFeedback && (
  <div className="feedbackDetails">
    <h3>Feedback Details</h3>
    <p><strong>Type:</strong> {selectedFeedback.type}</p>
    <p>{selectedFeedback.text}</p>
    <small className="feedback-time">{selectedFeedback.timestamp.toString()}</small>
    <p><strong>Status:</strong> {selectedFeedback.status}</p>
    <p><strong>Manager Response:</strong> {selectedFeedback.managerResponse}</p>
    <button onClick={() => setSelectedFeedback(null)}>Close</button>
  </div>
)}

    </div>

      {/* Notification Area */}
      <div className="notificationContainer">
        <h2>Notifications</h2>
        {notifications.length === 0 ? (
          <p>No notifications yet.</p>
        ) : (
          notifications.map((notification, index) => (
            <p key={index}>{notification}</p>
          ))
        )}
      </div>
    </div>
  );
}

export default ResidentFeedback;
