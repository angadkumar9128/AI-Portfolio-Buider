
import React from 'react';
import { Education } from '../../types';
import Card from '../shared/Card';
import SectionTitle from './SectionTitle';

const Education: React.FC<{ data: Education[] }> = ({ data }) => {
    return (
        <div>
            <SectionTitle>Education</SectionTitle>
            <div className="grid gap-8 md:grid-cols-2">
                {data.map((edu, index) => (
                    <Card key={index} className="transition-shadow duration-300 hover:shadow-xl">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{edu.institution}</h3>
                        <p className="text-md font-semibold text-blue-600 dark:text-blue-400 mt-1">{edu.degree}, {edu.fieldOfStudy}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{edu.startDate} - {edu.endDate}</p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">{edu.description}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Education;
