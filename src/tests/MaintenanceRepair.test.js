import React from 'react';
import { render, screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
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
  it('should display "Approve" and "Reject" buttons after setting status to "Completed"', async () => {
    renderWithProvider();
    const completeButton = screen.getAllByText(/Complete/i)[0];
    fireEvent.click(completeButton);

    // 等待 "Complete" 按钮消失，然后检查 "Approve" 按钮是否存在
    await waitForElementToBeRemoved(() => screen.getByText(/Complete/i), { timeout: 3000 });
    expect(screen.getByText(/Approve/i)).toBeInTheDocument();
    expect(screen.getByText(/Reject/i)).toBeInTheDocument();
  });

  it('should set status to "Finished" when "Approve" button is clicked', async () => {
    renderWithProvider();
    fireEvent.click(screen.getAllByText(/Complete/i)[0]);

    // 等待 "Approve" 按钮渲染
    await waitFor(() => expect(screen.getByText(/Approve/i)).toBeInTheDocument(), { timeout: 3000 });
    fireEvent.click(screen.getByText(/Approve/i));
    
    expect(screen.getByText(/Finished/i)).toBeInTheDocument();
  });

  it('should return status to "In Progress" when "Reject" button is clicked', async () => {
    renderWithProvider();
    fireEvent.click(screen.getAllByText(/Complete/i)[0]);

    // 等待 "Reject" 按钮渲染
    await waitFor(() => expect(screen.getByText(/Reject/i)).toBeInTheDocument(), { timeout: 3000 });
    fireEvent.click(screen.getByText(/Reject/i));

    expect(screen.getAllByText(/In Progress/i).length).toBeGreaterThan(1);
  });

  it('should disable the "Finished" button after approval', async () => {
    renderWithProvider();
    fireEvent.click(screen.getAllByText(/Complete/i)[0]);

    // 等待 "Approve" 按钮渲染
    await waitFor(() => expect(screen.getByText(/Approve/i)).toBeInTheDocument(), { timeout: 3000 });
    fireEvent.click(screen.getByText(/Approve/i));

    const finishedButton = screen.getByText(/Finished/i);
    expect(finishedButton).toBeDisabled();
  });
});
