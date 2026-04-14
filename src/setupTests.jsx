import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// STUPID SIMPLE MOCKS
const MockComp = ({ children }) => <div>{children}</div>;

vi.mock('framer-motion', () => ({
  motion: {
    div: MockComp,
    h1: MockComp,
    h2: MockComp,
    p: MockComp,
    button: MockComp,
    span: MockComp,
    section: MockComp,
    nav: MockComp,
    main: MockComp,
  },
  AnimatePresence: ({ children }) => children,
  useAnimation: () => ({ start: vi.fn(), stop: vi.fn() }),
  useScroll: () => ({ scrollY: { onChange: vi.fn() }, scrollX: { onChange: vi.fn() } }),
  useTransform: () => ({}),
  useSpring: () => ({}),
  useReducedMotion: () => false,
}));

vi.mock('lucide-react', () => {
  const Icon = () => <div />;
  return new Proxy({}, { get: () => Icon });
});

vi.mock('react-leaflet', () => ({
  MapContainer: MockComp,
  TileLayer: () => <div />,
  Marker: MockComp,
  Popup: MockComp,
  Polyline: () => <div />,
  useMap: () => ({ setMaxBounds: vi.fn(), on: vi.fn(), panInsideBounds: vi.fn() }),
}));

vi.mock('./contexts/AuthContext', () => ({
  AuthProvider: MockComp,
  useAuth: () => ({ 
    currentUser: null, 
    login: vi.fn(), 
    loginWithGoogle: vi.fn(),
    signup: vi.fn(),
    resetPassword: vi.fn(),
    updateUserProfile: vi.fn(),
    logout: vi.fn(),
    deleteAccount: vi.fn()
  }),
}));

vi.mock('./contexts/ThemeContext', () => ({
  ThemeProvider: MockComp,
  useTheme: () => ({ theme: 'dark', toggleTheme: vi.fn() }),
}));
