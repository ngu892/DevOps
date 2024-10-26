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
  it('should display "Approve" and "Reject" buttons after setting status to "Completed"', () => {
    renderWithProvider();

    // 点击 "Complete" 按钮以展示 "Approve" 和 "Reject" 按钮
    fireEvent.click(screen.getByText(/Complete/i));

    // 检查 "Approve" 和 "Reject" 按钮是否出现
    expect(screen.getByText(/Approve/i)).toBeInTheDocument();
    expect(screen.getByText(/Reject/i)).toBeInTheDocument();
  });

  it('should return status to "In Progress" when "Reject" button is clicked', () => {
    renderWithProvider();

    // 点击 "Complete" 按钮以展示 "Approve" 和 "Reject" 按钮
    fireEvent.click(screen.getByText(/Complete/i));

    // 点击 "Reject" 按钮
    fireEvent.click(screen.getByText(/Reject/i));

    // 检查状态是否回到 "In Progress"
    expect(screen.getByText(/In Progress/i)).toBeInTheDocument();
  });

  it('should set status to "Finished" when "Approve" button is clicked after rejection', () => {
    renderWithProvider();

    // 点击 "Complete" 按钮以展示 "Approve" 和 "Reject" 按钮
    fireEvent.click(screen.getByText(/Complete/i));

    // 点击 "Reject" 按钮让状态回到 "In Progress"
    fireEvent.click(screen.getByText(/Reject/i));
    expect(screen.getByText(/In Progress/i)).toBeInTheDocument();

    // 再次点击 "Complete" 按钮
    fireEvent.click(screen.getByText(/Complete/i));

    // 再点击 "Approve" 按钮将状态设置为 "Finished"
    fireEvent.click(screen.getByText(/Approve/i));

    // 检查状态是否变为 "Finished"
    expect(screen.getByText(/Finished/i)).toBeInTheDocument();
  });

  it('should disable the "Finished" button after approval', () => {
    renderWithProvider();

    // 点击 "Complete" 按钮以展示 "Approve" 和 "Reject" 按钮
    fireEvent.click(screen.getByText(/Complete/i));

    // 点击 "Approve" 按钮
    fireEvent.click(screen.getByText(/Approve/i));

    // 检查 "Finished" 按钮是否被禁用
    const finishedButton = screen.getByText(/Finished/i);
    expect(finishedButton).toBeDisabled();
  });
});
