
import React from 'react';
import { WorkExperience } from '../../types';
import Card from '../shared/Card';
import SectionTitle from './SectionTitle';

const Experience: React.FC<{ data: WorkExperience[] }> = ({ data }) => {
    return (
        <div>
            <SectionTitle>Work Experience</SectionTitle>
            <div className="relative border-l-2 border-blue-200 dark:border-gray-700 ml-6">
                {data.map((job, index) => (
                    <div key={index} className="mb-10 ml-10">
                        <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                            <svg className="w-4 h-4 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                                <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                        </span>
                        <Card className="shadow-xl transform hover:scale-105 transition-transform duration-300">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{job.jobTitle}</h3>
                                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">{job.company}</p>
                                </div>
                                <time className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400 whitespace-nowrap">{job.startDate} - {job.endDate}</time>
                            </div>
                            <ul className="mt-4 space-y-2 list-disc list-inside text-gray-600 dark:text-gray-400">
                                {job.responsibilities.map((resp, i) => (
                                    <li key={i}>{resp}</li>
                                ))}
                            </ul>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Experience;
