import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PaymentMethods.css'; // 引入样式文件

const PaymentMethods = () => {
  const navigate = useNavigate();

  const handlePayment = (method) => {
    // 处理支付逻辑
    navigate('/paymenthistory'); // 支付完成后跳转到 payment history
  };

  return (
    <div className="container">
      <h2>Select Payment Method</h2>
      <button onClick={() => handlePayment('Credit Card')}>Credit Card</button>
      <button onClick={() => handlePayment('PayPal')}>PayPal</button>
      <button onClick={() => handlePayment('Bank Transfer')}>Bank Transfer</button>
    </div>
  );
};

export default PaymentMethods;
