import React, { useState } from 'react';

const NavLink: React.FC<{ sectionId: string; children: React.ReactNode; onClick?: () => void }> = ({ sectionId, children, onClick }) => {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (onClick) {
            onClick();
        }
    };

    return (
        <a 
            href={`#${sectionId}`} 
            onClick={handleScroll}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300 font-medium"
        >
            {children}
        </a>
    );
};


const Header: React.FC<{ onAdminClick: () => void; isExporting?: boolean; }> = ({ onAdminClick, isExporting = false }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = ['experience', 'education', 'skills', 'projects', 'certifications', 'achievements', 'contact'];
    
    const closeMobileMenu = () => {
        setIsOpen(false);
    }

    return (
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg sticky top-0 z-50 shadow-md">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between h-20">
                    <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-2xl font-bold text-gray-800 dark:text-white">
                        Portfolio
                    </a>
                    <nav className="hidden md:flex items-center space-x-6">
                        {navItems.map(item => <NavLink key={item} sectionId={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</NavLink>)}
                         {!isExporting && (
                            <button onClick={onAdminClick} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
                                Admin
                            </button>
                         )}
                    </nav>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-gray-300 focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                            </svg>
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className="md:hidden pb-4">
                        <nav className="flex flex-col space-y-4">
                            {navItems.map(item => <NavLink key={item} sectionId={item} onClick={closeMobileMenu}>{item.charAt(0).toUpperCase() + item.slice(1)}</NavLink>)}
                             {!isExporting && (
                                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                                    <button onClick={() => { onAdminClick(); closeMobileMenu(); }} className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                                        Admin
                                    </button>
                                </div>
                             )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
