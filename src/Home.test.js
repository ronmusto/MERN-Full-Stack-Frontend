import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Home from './pages/Home';
import fetchMock from 'jest-fetch-mock';
import { BrowserRouter as Router } from 'react-router-dom';
import { MockUserProvider } from '../__mocks__/userProvider';

fetchMock.enableMocks();

jest.mock('../__mocks__/userProvider', () => ({
    UserContext: {
      Provider: ({ children }) => children,
      Consumer: ({ children }) => children(mockUserState),
    }
  }));

beforeEach(() => {
    fetch.resetMocks();
});

// RENDERING TESTS
test('renders registration and login forms', () => {
    render(
        <Router>
            <MockUserProvider>
                <Home />
            </MockUserProvider>
        </Router>
    );

    // Use getAllByPlaceholderText to handle the ambiguous queries
    const emailFields = screen.getAllByPlaceholderText('Email');
    const passwordFields = screen.getAllByPlaceholderText('Password');

    const regEmailField = emailFields[0];
    const regPasswordField = passwordFields[0];
    const regButton = screen.getByText('Register');

    const loginEmailField = emailFields[1];
    const loginPasswordField = passwordFields[1];
    const loginButton = screen.getByText('Login');

    expect(regEmailField).toBeInTheDocument();
    expect(regPasswordField).toBeInTheDocument();
    expect(regButton).toBeInTheDocument();

    expect(loginEmailField).toBeInTheDocument();
    expect(loginPasswordField).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
});

// INTERACTION TESTS
test('captures input in registration and login fields', () => {
    render(
        <Router>
            <MockUserProvider>
                <Home />
            </MockUserProvider>
        </Router>
    );

    // Use getAllByPlaceholderText to handle the ambiguous queries
    const emailFields = screen.getAllByPlaceholderText('Email');
    const passwordFields = screen.getAllByPlaceholderText('Password');

    const regEmailField = emailFields[0];
    const regPasswordField = passwordFields[0];

    const loginEmailField = emailFields[1];
    const loginPasswordField = passwordFields[1];

    fireEvent.change(regEmailField, { target: { value: 'test@domain.com' } });
    fireEvent.change(regPasswordField, { target: { value: 'test123' } });

    fireEvent.change(loginEmailField, { target: { value: 'login@domain.com' } });
    fireEvent.change(loginPasswordField, { target: { value: 'login123' } });

    expect(regEmailField.value).toBe('test@domain.com');
    expect(regPasswordField.value).toBe('test123');

    expect(loginEmailField.value).toBe('login@domain.com');
    expect(loginPasswordField.value).toBe('login123');
});

// TODO: Additional tests as mentioned in the comments...
