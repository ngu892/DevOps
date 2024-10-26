import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MaintenanceRepair from '../pages/MaintenanceRepair';
import { MaintenanceProvider } from '../context/MaintenanceContext';

const renderWithProvider = () => {
  render(
    <MaintenanceProvider>
      <MaintenanceRepair />
    </MaintenanceProvider>
  );
};

describe('MaintenanceRepair Component', () => {
  it('should follow the correct workflow from Pending to Completed and back to In Progress', () => {
    renderWithProvider();

    // 点击 "Complete" 按钮将状态变为 "Completed"
    fireEvent.click(screen.getAllByText(/Complete/i)[0]);
    expect(screen.getAllByText(/Completed/i).length).toBeGreaterThan(0);

    // 检查 "Approve" 和 "Reject" 按钮是否正确显示
    const approveButtons = screen.getAllByText(/Approve/i);
    const rejectButtons = screen.getAllByText(/Reject/i);
    expect(approveButtons.length).toBeGreaterThan(0);
    expect(rejectButtons.length).toBeGreaterThan(0);

    // 点击 "Reject" 按钮后状态变为 "In Progress"
    fireEvent.click(rejectButtons[0]);
    expect(screen.getAllByText(/In Progress/i).length).toBeGreaterThan(0);

    // 再次点击 "Complete" 按钮将状态变为 "Completed"
    fireEvent.click(screen.getAllByText(/Complete/i)[0]);
    expect(screen.getAllByText(/Completed/i).length).toBeGreaterThan(0);

    // 点击 "Approve" 按钮后确认不再有 "Approve" 或 "Reject" 按钮
    fireEvent.click(approveButtons[0]);
    expect(screen.queryByText(/Approve/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Reject/i)).not.toBeInTheDocument();
  });
});
