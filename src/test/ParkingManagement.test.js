import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ParkingManagement from '../pages/ParkingManagement';

test('allows user to park and exits with payment notification', () => {
  render(
    <BrowserRouter>
      <ParkingManagement />
    </BrowserRouter>
  );

  const input = screen.getByPlaceholderText('Enter License Plate');
  const parkButton = screen.getByText('Park');
  const exitButton = screen.getByText('Exit');

  // Initial state assertions
  expect(screen.getByText(/Available Spaces: 50/i)).toBeInTheDocument();

  // Simulate entering license plate and parking
  fireEvent.change(input, { target: { value: 'ABC123' } });
  fireEvent.click(parkButton);

  // After parking
  expect(screen.getByText(/Available Spaces: 49/i)).toBeInTheDocument();
  expect(screen.getByText(/Car parked successfully!/i)).toBeInTheDocument();

  // Clear notification for clear exit result check
  fireEvent.change(input, { target: { value: 'ABC123' } });
  fireEvent.click(exitButton);

  // Assume some time has passed, and check the payment process
  const expectedPaymentMessage = /Please pay \$0\./i;
  expect(screen.getByText(expectedPaymentMessage)).toBeInTheDocument();
});
