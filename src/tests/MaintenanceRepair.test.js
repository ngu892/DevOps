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

    // 点击 "Complete" 按钮将状态变为 "Completed"
    fireEvent.click(screen.getAllByText(/Complete/i)[0]);
    expect(screen.getAllByText(/Completed/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Approve/i)).toBeInTheDocument();
    expect(screen.getByText(/Reject/i)).toBeInTheDocument();

    // 点击 "Reject" 按钮后状态变为 "In Progress"
    fireEvent.click(screen.getByText(/Reject/i));
    expect(screen.getAllByText(/In Progress/i).length).toBeGreaterThan(0);

    // 再次点击 "Complete" 按钮将状态变为 "Completed"
    fireEvent.click(screen.getAllByText(/Complete/i)[0]);
    expect(screen.getAllByText(/Completed/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Approve/i)).toBeInTheDocument();
    expect(screen.getByText(/Reject/i)).toBeInTheDocument();

    // 点击 "Approve" 按钮后状态变为 "Finished"
    fireEvent.click(screen.getByText(/Approve/i));
    const finishedButton = screen.getByText(/Finished/i);
    expect(finishedButton).toBeInTheDocument();
    expect(finishedButton).toBeDisabled();
  });
});
