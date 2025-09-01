
import React from 'react';

const DeployGuideModal: React.FC<{ onClose: () => void; githubUsername: string }> = ({ onClose, githubUsername }) => {
    const repoUrl = `https://github.com/new?name=${githubUsername}.github.io&description=My+Personal+Portfolio&auto_init=true`;
    const liveSiteUrl = `https://${githubUsername}.github.io`;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4 pb-4 border-b dark:border-gray-600">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Deploy Your Portfolio</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" aria-label="Close modal">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-6 text-gray-700 dark:text-gray-300">
                        <p>Your portfolio has been downloaded as a <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">portfolio.zip</code> file. Follow these simple steps to host it online for free using GitHub Pages.</p>
                        
                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-lg mb-2">Step 1: Unzip the File</h3>
                                <p>First, unzip the <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">portfolio.zip</code> file. You will see an <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">index.html</code> file inside.</p>
                            </div>

                            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-lg mb-2">Step 2: Create a GitHub Repository</h3>
                                <p className="mb-3">You need a special repository on GitHub to host your site. It must be named exactly <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">{githubUsername}.github.io</code>.</p>
                                <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition">
                                    Click Here to Create the Repository
                                </a>
                                <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">This link pre-fills the repository name for you. Make sure it's set to 'Public'.</p>
                            </div>

                            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-lg mb-2">Step 3: Upload Your File</h3>
                                <p>In your new repository, click "Add file" {'>'} "Upload files". Drag and drop your <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">index.html</code> file into the uploader and commit the changes.</p>
                            </div>

                             <div className="p-4 bg-blue-50 dark:bg-blue-900/50 rounded-lg border border-blue-200 dark:border-blue-700">
                                <h3 className="font-semibold text-lg mb-2 text-blue-800 dark:text-blue-200">Step 4: Your Site is Live!</h3>
                                <p>Once uploaded, your portfolio will be live at <a href={liveSiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">{liveSiteUrl}</a>. It might take a few minutes to appear the first time.</p>
                            </div>
                        </div>

                         <div className="mt-6 pt-4 border-t dark:border-gray-600 text-sm text-gray-500 dark:text-gray-400">
                            <p>You can also host on <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Vercel</a> or <a href="https://netlify.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Netlify</a> by dragging and dropping the folder containing your <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">index.html</code>.</p>
                        </div>
                    </div>
                </div>
            </div>
             <style>{`
                @keyframes fade-in-scale {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in-scale { animation: fade-in-scale 0.2s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default DeployGuideModal;
