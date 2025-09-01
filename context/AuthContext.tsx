
import React, { createContext, useState, useContext, ReactNode } from 'react';

// In a real app, this would be more secure and come from a backend.
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "password123";

interface AuthContextType {
    isAdmin: boolean;
    login: (user: string, pass: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);

    const login = (user: string, pass: string): boolean => {
        if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
            setIsAdmin(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
