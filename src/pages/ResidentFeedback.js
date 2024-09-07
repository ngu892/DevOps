import React, { useState } from 'react';
import '../styles/ResidentFeedback.css';


function ResidentFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [newFeedback, setNewFeedback] = useState('');

  const handleFeedbackSubmit = () => {
    setFeedbackList([...feedbackList, { text: newFeedback, timestamp: new Date() }]);
    setNewFeedback('');
  };

  return (
    <div className="resident-feedback">
      <div className="headerContainer">
        <h1>Resident Feedback & Complaints</h1>
        <p>Submit your feedback and complaints confidentially.</p>
      </div>
      <div className="feedbackContainer">
        <h2>Your Feedback and Complaints</h2>
        <div className="feedbackList">
          {feedbackList.length === 0 ? (
            <p>No feedback or complaints yet.</p>
          ) : (
            feedbackList.map((feedback, index) => (
              <div key={index} className="feedback">
                <p>{feedback.text}</p>
                <small>{feedback.timestamp.toString()}</small>
              </div>
            ))
          )}
        </div>
        <div className="newFeedback">
          <textarea
            value={newFeedback}
            onChange={(e) => setNewFeedback(e.target.value)}
            placeholder="Enter your feedback or complaint..."
          />
          <button onClick={handleFeedbackSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default ResidentFeedback;
