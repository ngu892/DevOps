import { render, screen, fireEvent, act } from '@testing-library/react';
import ResidentCommunication from '../pages/ResidentCommunication.js';



test('should allow users to send a message', () => {
  render(<ResidentCommunication />);

  // Check for the input textarea
  const textarea = screen.getByPlaceholderText('Type your message...');
  expect(textarea).toBeInTheDocument();

  // Enter a message
  fireEvent.change(textarea, { target: { value: 'Hello, this is a test message' } });
  expect(textarea.value).toBe('Hello, this is a test message');

  // Send the message
  const sendButton = screen.getByText('Send Message');
  fireEvent.click(sendButton);

  // Verify the message is displayed
  const messageText = screen.getByText('Hello, this is a test message');
  expect(messageText).toBeInTheDocument();
});
