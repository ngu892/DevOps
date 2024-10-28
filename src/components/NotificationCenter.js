import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useMaintenance } from '../context/MaintenanceContext';

const NotificationCenter = () => {
  const { requests } = useMaintenance();
  const [overdueCount, setOverdueCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // 计算待处理和逾期任务数量
  useEffect(() => {
    const overdueTasks = requests.filter(request => request.status === 'Pending' && isOverdue(request.date));
    const pendingTasks = requests.filter(request => request.status === 'Pending');

    setOverdueCount(overdueTasks.length);
    setPendingCount(pendingTasks.length);
  }, [requests]);

  const isOverdue = (date) => {
    const taskDate = new Date(date);
    const currentDate = new Date();
    return taskDate < currentDate;
  };

  // 渲染通知详情
  const renderNotificationDetails = () => (
    <div style={{
      position: 'fixed',
      top: '60px',
      right: '20px',
      background: '#fff',
      border: '1px solid #ccc',
      padding: '10px',
      width: '300px',
      zIndex: 1000,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      borderRadius: '4px',
    }}>
      <h4>Pending Tasks: {pendingCount}</h4>
      <h4>Overdue Tasks: {overdueCount}</h4>
      <ul>
        {requests
          .filter(request => request.status === 'Pending')
          .map(request => (
            <li key={request.id} style={{ color: isOverdue(request.date) ? 'red' : 'black' }}>
              {request.issue} - {request.date} - {isOverdue(request.date) ? 'Overdue' : 'Pending'}
            </li>
          ))}
      </ul>
    </div>
  );

  return (
    <div style={{ position: 'relative' }}>
      {/* 通知图标 */}
      <button onClick={() => setShowDetails(!showDetails)}>
        Notifications ({pendingCount + overdueCount})
      </button>

      {/* 使用 Portal 渲染通知详情 */}
      {showDetails && ReactDOM.createPortal(
        renderNotificationDetails(),
        document.body
      )}
    </div>
  );
};

export default NotificationCenter;
