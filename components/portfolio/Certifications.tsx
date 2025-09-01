import React from 'react';
import { Certification } from '../../types';
import Card from '../shared/Card';
import SectionTitle from './SectionTitle';

const Certifications: React.FC<{ data: Certification[] }> = ({ data }) => {
    return (
        <div>
            <SectionTitle>Certifications</SectionTitle>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {data.map((cert, index) => (
                    <Card key={index} className="transition-shadow duration-300 hover:shadow-xl">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{cert.name}</h3>
                                <p className="text-md font-semibold text-gray-700 dark:text-gray-300 mt-1">{cert.issuingOrganization}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Issued: {cert.date}</p>
                                {cert.credentialUrl && (
                                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                        View Credential &rarr;
                                    </a>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Certifications;