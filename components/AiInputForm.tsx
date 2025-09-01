
import React, { useState } from 'react';
import { generatePortfolioContent } from '../services/geminiService';
import { PortfolioData } from '../types';
import Spinner from './shared/Spinner';

interface AiInputFormProps {
    onGenerated: (data: PortfolioData) => void;
}

const AiInputForm: React.FC<AiInputFormProps> = ({ onGenerated }) => {
    const [resumeText, setResumeText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!resumeText.trim()) {
            setError("Please paste your resume or LinkedIn profile content.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const portfolioData = await generatePortfolioContent(resumeText);
            onGenerated(portfolioData);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <div className="w-full max-w-3xl">
                <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-8">
                    <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-2">AI Portfolio Builder</h1>
                    <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
                        Paste your resume or LinkedIn profile text below to instantly generate a stunning, professional portfolio.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={resumeText}
                            onChange={(e) => setResumeText(e.target.value)}
                            placeholder="Paste your resume content here..."
                            className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            disabled={loading}
                        />
                        <div className="mt-6 text-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
                            >
                                {loading ? 'Generating...' : 'Build My Portfolio'}
                            </button>
                        </div>
                    </form>
                    {loading && (
                        <div className="mt-6">
                            <Spinner />
                            <p className="text-center text-gray-500 dark:text-gray-400 mt-2">AI is working its magic... this may take a moment.</p>
                        </div>
                    )}
                    {error && <p className="mt-4 text-center text-red-500">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default AiInputForm;
