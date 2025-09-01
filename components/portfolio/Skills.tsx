import React from 'react';
import { Skill } from '../../types';
import SectionTitle from './SectionTitle';

const Skills: React.FC<{ data: Skill[] }> = ({ data }) => {
    const skillsByCategory = data.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill.name);
        return acc;
    }, {} as Record<string, string[]>);

    return (
        <div className="bg-white dark:bg-gray-800 py-16 md:py-24 rounded-lg">
            <div className="container mx-auto px-4 md:px-8">
                <SectionTitle>Technical Skills</SectionTitle>
                <div className="space-y-8">
                    {/* FIX: Replaced Object.entries with Object.keys to avoid an issue where TypeScript infers the value of the key-value pair as 'unknown'. Using Object.keys and then accessing the property provides better type safety. */}
                    {Object.keys(skillsByCategory).map((category) => (
                        <div key={category}>
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">{category}</h3>
                            <div className="flex flex-wrap justify-center gap-3">
                                {skillsByCategory[category].map((skill, index) => (
                                    <span key={index} className="bg-blue-100 text-blue-800 text-md font-semibold px-4 py-2 rounded-full dark:bg-blue-900 dark:text-blue-200 shadow-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Skills;
