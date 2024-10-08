import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PropertyFee from '../pages/Propertyfee';

describe('PropertyFee component', () => {
  it('should render all initial fees correctly', () => {
    render(
      <Router>
        <PropertyFee />
      </Router>
    );

    // 使用 getAllByText 选择匹配的多个元素
    const managementFeeElements = screen.getAllByText(/Management Fee/i);
    expect(managementFeeElements.length).toBeGreaterThan(0);

    const maintenanceFeeElements = screen.getAllByText(/Maintenance Fee/i);
    expect(maintenanceFeeElements.length).toBeGreaterThan(0);

    const otherFeeElements = screen.getAllByText(/Other Fee/i);
    expect(otherFeeElements.length).toBeGreaterThan(0);
  });

  it('should correctly display total paid and remaining fees', () => {
    render(
      <Router>
        <PropertyFee />
      </Router>
    );

    expect(screen.getByText(/Total Fees Paid: \$0/i)).toBeInTheDocument();
    expect(screen.getByText(/Remaining Fees: \$180/i)).toBeInTheDocument();
  });

  it('should navigate to payment methods when "Pay Now" is clicked', () => {
    render(
      <Router>
        <PropertyFee />
      </Router>
    );

    // 使用 getAllByText 获取多个 "Pay Now" 按钮并点击第一个
    const payNowButtons = screen.getAllByText(/Pay Now/i);
    expect(payNowButtons.length).toBeGreaterThan(0);
    fireEvent.click(payNowButtons[0]); // 点击第一个 "Pay Now" 按钮
  });

  it('should generate a new fee when "Generate New Fee" is clicked', () => {
    const { getByText, getAllByText } = render(
      <Router>
        <PropertyFee />
      </Router>
    );

    expect(getAllByText(/Unpaid/i).length).toBe(3);
    fireEvent.click(getByText(/Generate New Fee/i));
    expect(getAllByText(/Unpaid/i).length).toBe(4);
  });

  it('should navigate to payment history when "View Payment History" is clicked', () => {
    const { getByText } = render(
      <Router>
        <PropertyFee />
      </Router>
    );

    fireEvent.click(getByText(/View Payment History/i));
  });
});
