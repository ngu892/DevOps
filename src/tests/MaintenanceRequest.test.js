import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MaintenanceRequest from '../pages/MaintenanceRequest';
import { MaintenanceProvider } from '../context/MaintenanceContext';

const renderWithProvider = () => {
  render(
    <MaintenanceProvider>
      <MaintenanceRequest />
    </MaintenanceProvider>
  );
};

describe('MaintenanceRequest Component', () => {
  it('should display the current maintenance requests', () => {
    renderWithProvider();
    
    // 检查是否正确显示了维护请求列表中的问题、日期和状态
    expect(screen.getByText('Leaking pipe')).toBeInTheDocument();
    expect(screen.getByText('2024-09-10')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();

    expect(screen.getByText('Broken door lock')).toBeInTheDocument();
    expect(screen.getByText('2024-09-11')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();

    expect(screen.getByText('Malfunctioning air conditioner')).toBeInTheDocument();
    expect(screen.getByText('2024-09-12')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('should allow the user to submit a new maintenance request', () => {
    renderWithProvider();
    
    const input = screen.getByPlaceholderText('Enter issue description');
    const submitButton = screen.getByText('Submit');

    // 输入新的维护请求并点击提交按钮
    fireEvent.change(input, { target: { value: 'Broken window' } });
    fireEvent.click(submitButton);

    // 检查新提交的维护请求是否出现在页面上
    expect(screen.getByText('Broken window')).toBeInTheDocument();

    // 使用 getAllByText 确认存在多个 'Pending' 元素
    const pendingStatuses = screen.getAllByText('Pending');
    expect(pendingStatuses.length).toBeGreaterThan(1); // 确认多个 Pending 状态的存在
  });

  it('should clear the input field after submitting a request', () => {
    renderWithProvider();
    
    const input = screen.getByPlaceholderText('Enter issue description');
    const submitButton = screen.getByText('Submit');

    // 输入新的维护请求并点击提交按钮
    fireEvent.change(input, { target: { value: 'Leaky roof' } });
    fireEvent.click(submitButton);

    // 确保输入框被清空
    expect(input.value).toBe('');
  });
});
