import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MaintenanceRepair from '../pages/MaintenanceRepair';
import { MaintenanceProvider } from '../context/MaintenanceContext';

// 封装渲染方法以包含 Provider
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
    const startButton = screen.getAllByText(/Start/i)[0];
    fireEvent.click(startButton);
    expect(screen.getAllByText(/In Progress/i).length).toBeGreaterThan(1);
  });

  it('should update the request status to "Completed" when "Complete" button is clicked', () => {
    renderWithProvider();
    const completeButton = screen.getAllByText(/Complete/i)[0];
    fireEvent.click(completeButton);
    expect(screen.getAllByText(/Completed/i).length).toBeGreaterThan(1);
  });

  it('should display "Approve" and "Reject" buttons after setting status to "Completed"', () => {
    renderWithProvider();
    const completeButton = screen.getAllByText(/Complete/i)[0];
    fireEvent.click(completeButton);
    expect(screen.getAllByText(/Approve/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Reject/i).length).toBeGreaterThan(0);
  });

  it('should set status to "Finished" when "Approve" button is clicked', () => {
    renderWithProvider();
    fireEvent.click(screen.getAllByText(/Complete/i)[0]);
    fireEvent.click(screen.getAllByText(/Approve/i)[0]);
    expect(screen.getByText(/Finished/i)).toBeInTheDocument();
  });

  it('should return status to "In Progress" when "Reject" button is clicked', () => {
    renderWithProvider();
    fireEvent.click(screen.getAllByText(/Complete/i)[0]);
    fireEvent.click(screen.getAllByText(/Reject/i)[0]);
    expect(screen.getAllByText(/In Progress/i).length).toBeGreaterThan(1);
  });

  it('should disable the "Finished" button after approval', () => {
    renderWithProvider();
    fireEvent.click(screen.getAllByText(/Complete/i)[0]);
    fireEvent.click(screen.getAllByText(/Approve/i)[0]);
    const finishedButton = screen.getByText(/Finished/i);
    expect(finishedButton).toBeDisabled();
  });
});
