
import React from 'react';

interface DownloadCTAProps {
    onDownloadClick: () => void;
    downloadStatus: 'idle' | 'downloading' | 'error';
}

const DownloadCTA: React.FC<DownloadCTAProps> = ({ onDownloadClick, downloadStatus }) => {
    const isDownloading = downloadStatus === 'downloading';

    const renderButtonContent = () => {
        switch (downloadStatus) {
            case 'downloading':
                return (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Packaging Your Portfolio...
                    </>
                );
            case 'error':
                return (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Download Failed. Retry
                    </>
                );
            default: // 'idle'
                return (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download as .ZIP
                    </>
                );
        }
    };

    return (
        <section id="download-cta" className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700">
            <div className="container mx-auto px-4 md:px-8 py-16 md:py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Take Your Portfolio With You
                </h2>
                <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
                    Download a complete, ready-to-host version of this portfolio. You can edit it in any code editor and deploy it anywhere.
                </p>
                <button
                    onClick={onDownloadClick}
                    disabled={isDownloading}
                    className={`inline-flex items-center justify-center px-8 py-4 font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:cursor-not-allowed disabled:scale-100 
                    ${downloadStatus === 'error' 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : 'bg-white text-blue-600 hover:bg-gray-100 disabled:bg-gray-300'}`}
                    aria-live="polite"
                >
                    {renderButtonContent()}
                </button>
            </div>
        </section>
    );
};

export default DownloadCTA;
