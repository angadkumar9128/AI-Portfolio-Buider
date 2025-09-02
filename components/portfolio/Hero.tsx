import React from 'react';
import { PersonalDetails } from '../../types';

const Hero: React.FC<{ data: PersonalDetails }> = ({ data }) => {
    const hasProfilePicture = !!data.profilePictureUrl;

    return (
        <section id="hero" className="bg-white dark:bg-gray-800 py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-8">
                {hasProfilePicture ? (
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
                        {/* Text content on the left for desktop */}
                        <div className="flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
                            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-4">
                                {data.name}
                            </h1>
                            <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-semibold mb-6">
                                {data.title}
                            </p>
                            <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-300 mb-8">
                                {data.summary}
                            </p>
                            {data.resumeUrl && (
                                <div className="mb-8">
                                    <a
                                        href={data.resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg"
                                        aria-label="Download Resume"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 9.293a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        Download Resume
                                    </a>
                                </div>
                            )}
                            <div className="flex items-center space-x-6">
                                {data.email && <a href={`mailto:${data.email}`} className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition" aria-label="Email"><IconEmail /></a>}
                                {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition" aria-label="LinkedIn"><IconLinkedIn /></a>}
                                {data.github && <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition" aria-label="GitHub"><IconGitHub /></a>}
                                {data.leetcode && <a href={data.leetcode} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition" aria-label="LeetCode"><IconLeetCode /></a>}
                                {data.hackerrank && <a href={data.hackerrank} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition" aria-label="HackerRank"><IconHackerRank /></a>}
                                {data.phone && <a href={`tel:${data.phone}`} className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition" aria-label="Phone"><IconPhone /></a>}
                            </div>
                        </div>
                        {/* Image on the right for desktop */}
                        <div className="flex-shrink-0 order-1 md:order-2">
                            <div className="relative">
                                <img
                                    src={data.profilePictureUrl}
                                    alt={data.name}
                                    className="rounded-full w-48 h-48 md:w-64 md:h-64 object-cover shadow-2xl border-4 border-white dark:border-gray-700"
                                />
                                 <div className="absolute inset-0 rounded-full border-4 border-blue-500/50 animate-pulse-slow"></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-4">
                            {data.name}
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-semibold mb-6">
                            {data.title}
                        </p>
                        <p className="max-w-3xl text-lg text-gray-600 dark:text-gray-300 mb-8">
                            {data.summary}
                        </p>
                        {data.resumeUrl && (
                            <div className="mb-8">
                                <a
                                    href={data.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg"
                                    aria-label="Download Resume"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 9.293a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    Download Resume
                                </a>
                            </div>
                        )}
                        <div className="flex items-center space-x-6">
                            {data.email && <a href={`mailto:${data.email}`} className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition" aria-label="Email"><IconEmail /></a>}
                            {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition" aria-label="LinkedIn"><IconLinkedIn /></a>}
                            {data.github && <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition" aria-label="GitHub"><IconGitHub /></a>}
                            {data.leetcode && <a href={data.leetcode} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition" aria-label="LeetCode"><IconLeetCode /></a>}
                            {data.hackerrank && <a href={data.hackerrank} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition" aria-label="HackerRank"><IconHackerRank /></a>}
                            {data.phone && <a href={`tel:${data.phone}`} className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition" aria-label="Phone"><IconPhone /></a>}
                        </div>
                    </div>
                )}
            </div>
             <style>{`
                @keyframes pulse-slow {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.05); opacity: 0.8; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s infinite ease-in-out;
                }
            `}</style>
        </section>
    );
};

// SVG Icon components
const IconEmail = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const IconLinkedIn = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
);
const IconGitHub = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
);
const IconPhone = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
);
const IconLeetCode = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.483 0a1.374 1.374 0 0 0-1.374 1.374v9.704h-1.247v-6.445a1.374 1.374 0 0 0-2.748 0v6.445h-1.247v-3.796a1.374 1.374 0 0 0-2.748 0v3.796H2.748a1.374 1.374 0 0 0 0 2.748h1.374v1.247H2.748a1.374 1.374 0 0 0 0 2.748h1.374v1.247H2.748a1.374 1.374 0 0 0 0 2.748h10.994c.76 0 1.374-.615 1.374-1.374V1.374A1.374 1.374 0 0 0 13.483 0zM21.252 8.626H19.878v1.247h1.374a1.374 1.374 0 0 0 0-2.748h-1.374v-1.247h1.374a1.374 1.374 0 1 0 0-2.748h-2.748a1.374 1.374 0 0 0-1.374 1.374v6.445h1.247v-1.247h1.503l1.245 1.247h1.503l-1.374-1.374a1.374 1.374 0 0 0 1.374-1.374v-1.247a1.374 1.374 0 0 0-1.374-1.374z" />
    </svg>
);
const IconHackerRank = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.025 24.004c6.625 0 12-5.375 12-12s-5.375-12-12-12S.025 5.379.025 12.004s5.375 12 12 12zM7.52 18.006V6.002h1.84v12.004H7.52zm3.17-9.003h1.84v9.003h-1.84V9.003zm3.175 2.126h1.84v6.877h-1.84v-6.877z" />
    </svg>
);

export default Hero;