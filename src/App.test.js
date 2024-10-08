import { render, screen } from '@testing-library/react';
import App from './App';

test('renders homepage header', () => {
  render(<App />);
  const headerElement = screen.getByText(/THIS IS THE HOMEPAGE/i);
  expect(headerElement).toBeInTheDocument();
});
