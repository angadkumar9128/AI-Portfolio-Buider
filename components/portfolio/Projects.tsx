import React from 'react';
import { Project } from '../../types';
import SectionTitle from './SectionTitle';

const Projects: React.FC<{ data: Project[] }> = ({ data }) => {
    return (
        <div>
            <SectionTitle>Projects</SectionTitle>
            <div className="grid gap-8 lg:gap-12 md:grid-cols-1 lg:grid-cols-2">
                {data.map((project, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden flex flex-col h-full group transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                        <div className="relative">
                            <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                {project.imageUrl ? (
                                    <img 
                                        src={project.imageUrl} 
                                        alt={project.name} 
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.name}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{project.description}</p>
                            <div className="mt-auto">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.map((tech, i) => (
                                        <span key={i} className="text-xs font-semibold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full dark:bg-blue-900/50 dark:text-blue-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center group-hover:text-blue-700 dark:group-hover:text-blue-300">
                                        View Project 
                                        <svg className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;