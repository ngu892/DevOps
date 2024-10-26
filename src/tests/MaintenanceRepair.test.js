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
  it('should follow the correct workflow from Pending to Finished', () => {
    renderWithProvider();

    // 1. 初始状态为 "Pending"，Actions 显示 "Start" 和 "Complete"
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Start/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Complete/i).length).toBeGreaterThan(0);

    // 点击 "Complete" 按钮将状态变为 "Completed"
    fireEvent.click(screen.getAllByText(/Complete/i)[0]);
    expect(screen.getByText(/Completed/i)).toBeInTheDocument();
    expect(screen.getByText(/Approve/i)).toBeInTheDocument();
    expect(screen.getByText(/Reject/i)).toBeInTheDocument();

    // 2. 点击 "Reject" 按钮后状态变为 "In Progress"，显示 "Start" 和 "Complete"
    fireEvent.click(screen.getByText(/Reject/i));
    expect(screen.getByText(/In Progress/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Start/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Complete/i).length).toBeGreaterThan(0);

    // 3. 点击 "Complete" 按钮再次变为 "Completed"，显示 "Approve" 和 "Reject"
    fireEvent.click(screen.getAllByText(/Complete/i)[0]);
    expect(screen.getByText(/Completed/i)).toBeInTheDocument();
    expect(screen.getByText(/Approve/i)).toBeInTheDocument();
    expect(screen.getByText(/Reject/i)).toBeInTheDocument();

    // 4. 点击 "Approve" 按钮后状态变为 "Finished"，并禁用按钮
    fireEvent.click(screen.getByText(/Approve/i));
    const finishedButton = screen.getByText(/Finished/i);
    expect(finishedButton).toBeInTheDocument();
    expect(finishedButton).toBeDisabled();
  });
});
