import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Digital Habits. Entrance test text', () => {
  render(<App />);
  const elem = screen.getByText(/Habits\. Entrance/i);
  expect(elem).toBeInTheDocument();
});
