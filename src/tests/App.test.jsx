import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App Basic UI Tests', () => {
  it('renders fixed splash screen initially', () => {
    render(<App />);
    expect(screen.getByText(/FlowPass/i)).toBeInTheDocument();
  });

  it('navigates to the Login screen after splash phase', async () => {
    render(<App />);
    
    // Wait for splash to disappear and Login screen to appear
    await waitFor(() => {
      expect(screen.queryByText(/Apex Stadium Solutions/i)).not.toBeInTheDocument();
    }, { timeout: 4000 });

    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('verifies premium login fields appear', async () => {
    render(<App />);
    
    await waitFor(() => {
      const inputs = screen.getAllByPlaceholderText(/.+/);
      return inputs.length > 0;
    }, { timeout: 4000 });

    expect(screen.getByPlaceholderText(/name@company.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();
  });
});
