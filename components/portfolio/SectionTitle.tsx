
import React from 'react';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white inline-block relative">
                {children}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-blue-500 rounded-full"></span>
            </h2>
        </div>
    );
};

export default SectionTitle;
