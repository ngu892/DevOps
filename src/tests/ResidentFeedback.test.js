import { render, screen, fireEvent, act } from '@testing-library/react';
import ResidentFeedback from '../pages/ResidentFeedback.js';

test('should allow users to submit feedback or complaints', () => {
  act(() => {
    render(<ResidentFeedback />);
  });

  
  const textarea = screen.getByPlaceholderText('Enter your feedback or complaint...');
  act(() => {
    fireEvent.change(textarea, { target: { value: 'There is an issue with the elevator' } });
  });

  
  const select = screen.getByDisplayValue('Complaint');
  act(() => {
    fireEvent.change(select, { target: { value: 'Suggestion' } });
  });

  
  const submitButton = screen.getByText('Submit');
  act(() => {
    fireEvent.click(submitButton);
  });

 
  const feedbackType = screen.getByText(/Type:/);
  console.log('Feedback type text content:', feedbackType.textContent);  

 
});
