
import React, { useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import Header from './Header';
import Hero from './Hero';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import Projects from './Projects';
import Achievements from './Achievements';
import Certifications from './Certifications';
import Footer from './Footer';
import DownloadCTA from './DownloadCTA';

interface PortfolioProps {
    onAdminClick: () => void;
    onDownloadClick: () => void;
    downloadStatus: 'idle' | 'downloading' | 'error';
    isExporting?: boolean;
}

const Portfolio: React.FC<PortfolioProps> = ({ onAdminClick, onDownloadClick, downloadStatus, isExporting = false }) => {
    const { portfolioData } = usePortfolio();

    useEffect(() => {
        // This effect should not run during server-side rendering for export
        if (!isExporting && portfolioData?.seo) {
            document.title = portfolioData.seo.title;
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', portfolioData.seo.description);
            } else {
                const newMeta = document.createElement('meta');
                newMeta.name = 'description';
                newMeta.content = portfolioData.seo.description;
                document.head.appendChild(newMeta);
            }
        }
    }, [portfolioData, isExporting]);

    if (!portfolioData) {
        return <div className="text-center p-8">Loading portfolio data...</div>;
    }

    const sections = [
        { id: 'experience', component: <Experience data={portfolioData.workExperience} />, condition: portfolioData.workExperience?.length > 0 },
        { id: 'education', component: <Education data={portfolioData.education} />, condition: portfolioData.education?.length > 0 },
        { id: 'skills', component: <Skills data={portfolioData.skills} />, condition: portfolioData.skills?.length > 0 },
        { id: 'projects', component: <Projects data={portfolioData.projects} />, condition: portfolioData.projects?.length > 0 },
        { id: 'certifications', component: <Certifications data={portfolioData.certifications} />, condition: portfolioData.certifications?.length > 0 },
        { id: 'achievements', component: <Achievements data={portfolioData.achievements} />, condition: portfolioData.achievements?.length > 0 },
    ];

    return (
        <div className="bg-gray-50 dark:bg-gray-900">
            <Header 
                onAdminClick={onAdminClick} 
                isExporting={isExporting} 
            />
            <main>
                <Hero data={portfolioData.personalDetails} />
                {sections.map(section => (
                    section.condition && (
                        <section key={section.id} id={section.id} className="py-16 md:py-24">
                            <div className="container mx-auto px-4 md:px-8">
                                {section.component}
                            </div>
                        </section>
                    )
                ))}
            </main>
            {!isExporting && <DownloadCTA onDownloadClick={onDownloadClick} downloadStatus={downloadStatus} />}
            <Footer name={portfolioData.personalDetails.name} />
        </div>
    );
};

export default Portfolio;
