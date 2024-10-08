import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PropertyFee from '../pages/Propertyfee';  // 更新了导入路径

describe('PropertyFee component', () => {
  it('should render all initial fees correctly', () => {
    render(
      <Router>
        <PropertyFee />
      </Router>
    );

    // 验证费项是否正确渲染
    expect(screen.getByText(/Management Fee/i)).toBeInTheDocument();
    expect(screen.getByText(/Maintenance Fee/i)).toBeInTheDocument();
    expect(screen.getByText(/Other Fee/i)).toBeInTheDocument();
  });

  it('should correctly display total paid and remaining fees', () => {
    render(
      <Router>
        <PropertyFee />
      </Router>
    );

    // 验证初始的支付总额和剩余总额是否正确
    expect(screen.getByText(/Total Fees Paid: \$0/i)).toBeInTheDocument();
    expect(screen.getByText(/Remaining Fees: \$180/i)).toBeInTheDocument();
  });

  it('should navigate to payment methods when "Pay Now" is clicked', () => {
    const { getByText } = render(
      <Router>
        <PropertyFee />
      </Router>
    );

    // 模拟点击未支付的费用的“Pay Now”按钮
    fireEvent.click(getByText(/Pay Now/i));
  });

  it('should generate a new fee when "Generate New Fee" is clicked', () => {
    const { getByText, getAllByText } = render(
      <Router>
        <PropertyFee />
      </Router>
    );

    // 初始有3个费用项
    expect(getAllByText(/Unpaid/i).length).toBe(3);

    // 点击“Generate New Fee”按钮
    fireEvent.click(getByText(/Generate New Fee/i));

    // 验证生成新的费用项
    expect(getAllByText(/Unpaid/i).length).toBe(4);
  });

  it('should navigate to payment history when "View Payment History" is clicked', () => {
    const { getByText } = render(
      <Router>
        <PropertyFee />
      </Router>
    );

    // 模拟点击“View Payment History”按钮
    fireEvent.click(getByText(/View Payment History/i));
  });
});
