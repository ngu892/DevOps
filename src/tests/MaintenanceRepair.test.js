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
  it('should display the correct number of requests by status', () => {
    renderWithProvider();

    expect(screen.getByText(/Pending Requests: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/In Progress Requests: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed Requests: 1/i)).toBeInTheDocument();
  });

  it('should update the request status to "In Progress" when "Start" button is clicked', () => {
    renderWithProvider();
    const startButtons = screen.getAllByText(/Start/i);
    fireEvent.click(startButtons[0]);
    const inProgressStatus = screen.getAllByText(/In Progress/i);
    expect(inProgressStatus.length).toBeGreaterThan(1);
  });

  it('should update the request status to "Completed" when "Complete" button is clicked', () => {
    renderWithProvider();
    const completeButtons = screen.getAllByText(/Complete/i);
    fireEvent.click(completeButtons[0]);
    const completedStatus = screen.getAllByText(/Completed/i);
    expect(completedStatus.length).toBeGreaterThan(1);
  });

  it('should disable the "Completed" button for completed requests', () => {
    renderWithProvider();
    const completedButtons = screen.getAllByRole('button', { name: /Completed/i }); // 只获取按钮元素
    completedButtons.forEach((button) => {
      expect(button).toBeDisabled(); // 检查每个“Completed”按钮是否被禁用
    });
  });
});
