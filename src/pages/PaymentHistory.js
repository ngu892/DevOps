import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate 钩子
import { PaymentContext } from '../context/PaymentContext'; // 导入支付上下文

const PaymentHistory = () => {
  const { paymentHistory } = useContext(PaymentContext); // 使用上下文中的 paymentHistory
  const navigate = useNavigate(); // 使用 useNavigate 钩子

  // 返回到 PropertyFee 页面
  const handleBack = () => {
    navigate('/propertyfee');
  };

  return (
    <div>
      <h2>Payment History</h2>
      <table>
        <thead>
          <tr>
            <th>Fee Type</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Method</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((payment, index) => (
            <tr key={index}>
              <td>{payment.type}</td>
              <td>${payment.amount}</td>
              <td>{payment.paymentDate}</td>
              <td>{payment.method}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 返回按钮 */}
      <button onClick={handleBack} style={{ marginTop: '20px' }}>
        Return to Property Fee Management
      </button>
    </div>
  );
};

export default PaymentHistory;
