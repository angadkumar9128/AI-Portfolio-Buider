
import React from 'react';

const Footer: React.FC<{ name: string }> = ({ name }) => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-gray-800 dark:bg-black text-white py-6">
            <div className="container mx-auto px-4 md:px-8 text-center">
                <p>&copy; {currentYear} {name}. All rights reserved.</p>
                <p className="text-sm text-gray-400 mt-2">Portfolio generated with AI Portfolio Builder.</p>
            </div>
        </footer>
    );
};

export default Footer;
