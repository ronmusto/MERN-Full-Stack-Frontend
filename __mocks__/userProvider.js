import React, { createContext } from 'react';

const UserContext = createContext();

const mockUserState = {
    user: null,
    setUser: jest.fn()
};

// MockUserProvider component that wraps children with the mocked user context.
export const MockUserProvider = ({ children }) => {
    return (
        <UserContext.Provider value={mockUserState}>
            {children}
        </UserContext.Provider>
    );
};
