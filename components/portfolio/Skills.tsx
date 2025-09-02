import React from 'react';
import { Skill } from '../../types';
import SectionTitle from './SectionTitle';
import Card from '../shared/Card';

const Skills: React.FC<{ data: Skill[] }> = ({ data }) => {
    const skillsByCategory = data.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    return (
        <div className="bg-white dark:bg-gray-800 py-16 md:py-24 rounded-lg">
            <div className="container mx-auto px-4 md:px-8">
                <SectionTitle>Technical Skills</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.keys(skillsByCategory).map((category) => (
                        <Card key={category} className="transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center border-b pb-3 dark:border-gray-700">{category}</h3>
                            <div className="space-y-6">
                                {skillsByCategory[category].map((skill, index) => (
                                    <div key={index} aria-label={`${skill.name} proficiency: ${skill.level}%`}>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-base font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{skill.level}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2.5 rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${skill.level}%` }}
                                                role="progressbar"
                                                aria-valuenow={skill.level}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Skills;