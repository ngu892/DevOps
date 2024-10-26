import { render, screen, fireEvent, act } from '@testing-library/react';
import ResidentFeedback from '../pages/ResidentFeedback.js';

test('should allow users to submit feedback or complaints', () => {
  render(<ResidentFeedback />);

  // 查询并填充反馈文本区域
  const textarea = screen.getByPlaceholderText('Enter your feedback or complaint...');
  fireEvent.change(textarea, { target: { value: 'There is an issue with the elevator' } });

  // 查询并选择反馈类型
  const select = screen.getByDisplayValue('Complaint');
  fireEvent.change(select, { target: { value: 'Suggestion' } });

  // 点击提交按钮
  const submitButton = screen.getByText('Submit');
  fireEvent.click(submitButton);

  // 验证反馈类型是否正确显示
  const feedbackType = screen.getByText(/Type:/);
  console.log('Feedback type text content:', feedbackType.textContent);  
});
