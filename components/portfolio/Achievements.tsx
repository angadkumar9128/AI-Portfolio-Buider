
import React from 'react';
import { Achievement } from '../../types';
import Card from '../shared/Card';
import SectionTitle from './SectionTitle';

const Achievements: React.FC<{ data: Achievement[] }> = ({ data }) => {
    return (
        <div className="bg-white dark:bg-gray-800 py-16 md:py-24 rounded-lg">
            <div className="container mx-auto px-4 md:px-8">
                <SectionTitle>Achievements & Awards</SectionTitle>
                <div className="max-w-3xl mx-auto space-y-6">
                    {data.map((ach, index) => (
                        <Card key={index} className="transition-all duration-300 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600 border border-transparent">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{ach.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{ach.description}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Achievements;