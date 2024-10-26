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

    // 使用 `getAllByText` 获取多个 "Pending" 元素
    const pendingElements = screen.getAllByText(/Pending/i);
    expect(pendingElements.length).toBeGreaterThan(0);  // 检查是否存在多个 Pending 项目

    // 点击 "Complete" 按钮将状态变为 "Completed"
    fireEvent.click(screen.getAllByText(/Complete/i)[0]);
    expect(screen.getByText(/Completed/i)).toBeInTheDocument();
    expect(screen.getByText(/Approve/i)).toBeInTheDocument();
    expect(screen.getByText(/Reject/i)).toBeInTheDocument();

    // 点击 "Reject" 按钮后状态变为 "In Progress"
    fireEvent.click(screen.getByText(/Reject/i));
    expect(screen.getByText(/In Progress/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Start/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Complete/i).length).toBeGreaterThan(0);

    // 点击 "Complete" 按钮再次变为 "Completed"
    fireEvent.click(screen.getAllByText(/Complete/i)[0]);
    expect(screen.getByText(/Completed/i)).toBeInTheDocument();
    expect(screen.getByText(/Approve/i)).toBeInTheDocument();
    expect(screen.getByText(/Reject/i)).toBeInTheDocument();

    // 点击 "Approve" 按钮后状态变为 "Finished"
    fireEvent.click(screen.getByText(/Approve/i));
    const finishedButton = screen.getByText(/Finished/i);
    expect(finishedButton).toBeInTheDocument();
    expect(finishedButton).toBeDisabled();
  });
});
