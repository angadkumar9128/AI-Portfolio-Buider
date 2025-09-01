
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { PortfolioData } from '../types';

interface PortfolioContextType {
    portfolioData: PortfolioData | null;
    setPortfolioData: React.Dispatch<React.SetStateAction<PortfolioData | null>>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode; initialData?: PortfolioData | null }> = ({ children, initialData = null }) => {
    const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(initialData);

    return (
        <PortfolioContext.Provider value={{ portfolioData, setPortfolioData }}>
            {children}
        </PortfolioContext.Provider>
    );
};

export const usePortfolio = () => {
    const context = useContext(PortfolioContext);
    if (context === undefined) {
        throw new Error('usePortfolio must be used within a PortfolioProvider');
    }
    return context;
};
