import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface AnimatedSectionProps {
    children: ReactNode;
    id: string;
    isExporting?: boolean;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, id, isExporting = false }) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (isExporting) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (sectionRef.current) {
                        observer.unobserve(sectionRef.current);
                    }
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(sectionRef.current);
            }
        };
    }, [isExporting]);

    return (
        <section
            ref={sectionRef}
            id={id}
            className={`py-16 md:py-24 ${!isExporting ? `section-animate ${isVisible ? 'is-visible' : ''}` : ''}`}
        >
            <div className="container mx-auto px-4 md:px-8">
                {children}
            </div>
        </section>
    );
};

export default AnimatedSection;
