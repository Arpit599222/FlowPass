import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NavigationScreen } from '../NavigationScreen';

// Basic test to ensure the component renders and has the primary action button
describe('NavigationScreen', () => {
  it('renders correctly and shows the primary navigation button', () => {
    // Note: Leaflet components might need mocking in a real test environment
    render(<NavigationScreen />);
    
    // Check for the "Navigate Now" button
    const navigateButton = screen.getByText(/Navigate Now/i);
    expect(navigateButton).toBeDefined();
    
    // Check for the Smart Buddy header
    expect(screen.getByText(/Smart Buddy/i)).toBeDefined();
  });
});
