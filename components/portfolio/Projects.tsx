
import React from 'react';
import { Project } from '../../types';
import Card from '../shared/Card';
import SectionTitle from './SectionTitle';

const Projects: React.FC<{ data: Project[] }> = ({ data }) => {
    return (
        <div>
            <SectionTitle>Projects</SectionTitle>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {data.map((project, index) => (
                    <Card key={index} className="flex flex-col h-full transform hover:-translate-y-2 transition-transform duration-300">
                        <div className="flex-grow">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.name}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-2 mb-4">{project.description}</p>
                        </div>
                        <div className="mt-auto">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies.map((tech, i) => (
                                    <span key={i} className="text-xs font-semibold bg-gray-200 text-gray-800 px-2.5 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                    View Project &rarr;
                                </a>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Projects;
