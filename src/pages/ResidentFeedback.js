import React, { useState } from 'react';
import '../styles/ResidentFeedback.css';

function ResidentFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [newFeedback, setNewFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('Complaint');
  const [showHistory, setShowHistory] = useState(false); // 控制历史记录的显示/隐藏
  const [selectedFeedback, setSelectedFeedback] = useState(null); // 当前查看的详细反馈
  const [notifications, setNotifications] = useState([]); // 用于显示已处理的通知
  const [loading, setLoading] = useState(false); // 加载状态，用于显示等待

  // 模拟物业管理回复
  const generateManagerResponse = (feedbackText) => {
    // 根据反馈内容生成一个物业管理的回应
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
      managerResponse: "Awaiting manager response...", // 初始化为“待处理”
    };

    setFeedbackList([...feedbackList, newEntry]);
    setNewFeedback('');
    setFeedbackType('Complaint');

    // 模拟物业回复，3秒后自动生成回复并将状态改为“已处理”
    setTimeout(() => {
      const managerResponse = generateManagerResponse(newEntry.text); // 生成物业管理的回答
      setFeedbackList(prevList => 
        prevList.map(fb => 
          fb.timestamp === newEntry.timestamp 
            ? { ...fb, status: 'Resolved', managerResponse }
            : fb
        )
      );
      setNotifications(prevNotifications => [...prevNotifications, `Your feedback "${newEntry.text}" has been resolved with a response from management.`]);
    }, 3000); // 3秒后处理完成
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

        {/* 查看历史记录按钮 */}
        <button onClick={() => setShowHistory(!showHistory)} className="history-button">
          {showHistory ? 'Hide History' : 'View History'}
        </button>

        {/* 历史记录展开区域 */}
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
                  <small>{feedback.timestamp.toString()}</small>
                  <button onClick={() => setSelectedFeedback(feedback)}>View Details</button>
                </div>
              ))
            )}
          </div>
        )}

        {/* 详细反馈信息显示区域 */}
        {selectedFeedback && (
          <div className="feedbackDetails">
            <h3>Feedback Details</h3>
            <p><strong>Type:</strong> {selectedFeedback.type}</p>
            <p>{selectedFeedback.text}</p>
            <small>{selectedFeedback.timestamp.toString()}</small>
            <p><strong>Status:</strong> {selectedFeedback.status}</p>
            <p><strong>Manager Response:</strong> {selectedFeedback.managerResponse}</p> {/* 显示物业管理的回复 */}
            <button onClick={() => setSelectedFeedback(null)}>Close</button>
          </div>
        )}
      </div>

      {/* 通知区域 */}
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
