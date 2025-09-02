import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { PortfolioData, WorkExperience, Education, Skill, Project, Achievement, Certification } from '../../types';
import AdminMessages from './AdminMessages';

type Section = keyof PortfolioData;
type AdminView = Section | 'messages';

// Templates for creating new, empty items in the dashboard
const newWorkExperience: WorkExperience = { company: '', jobTitle: '', startDate: '', endDate: 'Present', responsibilities: [''] };
const newEducation: Education = { institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '' };
const newSkill: Skill = { category: '', name: '', level: 80 };
const newProject: Project = { name: '', description: '', technologies: [''], link: '', imageUrl: '' };
const newAchievement: Achievement = { title: '', description: '' };
const newCertification: Certification = { name: '', issuingOrganization: '', date: '', credentialUrl: '' };


const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const { logout } = useAuth();
    const { portfolioData, setPortfolioData } = usePortfolio();
    const [activeSection, setActiveSection] = useState<AdminView>('personalDetails');
    const [formData, setFormData] = useState<PortfolioData | null>(null);
    const [showSaveSuccess, setShowSaveSuccess] = useState(false);
    
    useEffect(() => {
        if (portfolioData) {
            // Normalize data to ensure optional fields for editing are present
            const normalizedData = JSON.parse(JSON.stringify(portfolioData));
            if (normalizedData.certifications) {
                normalizedData.certifications = normalizedData.certifications.map((cert: Certification) => ({
                    ...cert,
                    credentialUrl: cert.credentialUrl ?? '',
                }));
            }
            setFormData(normalizedData);
        }
    }, [portfolioData]);

    if (!formData) return <p>Loading data...</p>;

    const handleLogout = () => {
        logout();
        onLogout();
    };

    const handleSave = () => {
        if (formData) {
            setPortfolioData(formData);
        }
        setShowSaveSuccess(true);
        setTimeout(() => setShowSaveSuccess(false), 2000);
    };

    // Generic handler for input changes
    const handleInputChange = (section: Section, index: number | null, field: string, value: string) => {
        setFormData(prevData => {
            if (!prevData) return null;
            const newData = JSON.parse(JSON.stringify(prevData));
            if (index !== null && Array.isArray(newData[section])) {
                (newData[section] as any)[index][field] = value;
            } else {
                (newData[section] as any)[field] = value;
            }
            return newData;
        });
    };

    const handleImageChange = (file: File | null, onResult: (base64: string) => void) => {
        if (!file) {
            onResult(''); // Handle removal by sending back an empty string
            return;
        }

        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file (PNG, JPG, WebP).');
            return;
        }
        if (file.size > 2 * 1024 * 1024) { // 2MB limit
            alert('Image size should not exceed 2MB.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            onResult(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleProjectImageUpload = (index: number, file: File | null) => {
        handleImageChange(file, (base64) => {
             setFormData(prevData => {
                if (!prevData) return null;
                const newData = JSON.parse(JSON.stringify(prevData));
                (newData['projects'] as any)[index]['imageUrl'] = base64;
                return newData;
            });
        });
    };

    const handleProfilePictureUpload = (file: File | null) => {
        handleImageChange(file, (base64) => {
            setFormData(prevData => {
                if (!prevData) return null;
                const newData = { ...prevData };
                newData.personalDetails.profilePictureUrl = base64;
                return newData;
            });
        });
    };

    // Handlers for nested arrays (e.g., responsibilities, technologies)
    const handleNestedArrayChange = (section: Section, itemIndex: number, field: string, subIndex: number, value: string) => {
        setFormData(prevData => {
            if (!prevData) return null;
            const newData = JSON.parse(JSON.stringify(prevData));
            (newData[section] as any[])[itemIndex][field][subIndex] = value;
            return newData;
        });
    };

    const handleAddNestedItem = (section: Section, index: number, field: string) => {
         setFormData(prevData => {
            if (!prevData) return null;
            const newData = JSON.parse(JSON.stringify(prevData));
            (newData[section] as any)[index][field].push('');
            return newData;
        });
    };
    
    const handleRemoveNestedItem = (section: Section, index: number, field: string, subIndex: number) => {
         setFormData(prevData => {
            if (!prevData) return null;
            const newData = JSON.parse(JSON.stringify(prevData));
            (newData[section] as any)[index][field].splice(subIndex, 1);
            return newData;
        });
    };

    // Handlers for top-level array items (e.g., adding a new job)
    const handleAddItem = (section: Section) => {
        setFormData(prevData => {
            if (!prevData || !Array.isArray(prevData[section])) return prevData;
            const newData = JSON.parse(JSON.stringify(prevData));
            let newItem;
            switch (section) {
                case 'workExperience': newItem = newWorkExperience; break;
                case 'education': newItem = newEducation; break;
                case 'skills': newItem = newSkill; break;
                case 'projects': newItem = newProject; break;
                case 'achievements': newItem = newAchievement; break;
                case 'certifications': newItem = newCertification; break;
                default: return prevData;
            }
            (newData[section] as any[]).push(newItem);
            return newData;
        });
    };
    
    const handleRemoveItem = (section: Section, index: number) => {
        setFormData(prevData => {
            if (!prevData || !Array.isArray(prevData[section])) return prevData;
            const newData = JSON.parse(JSON.stringify(prevData));
            (newData[section] as any[]).splice(index, 1);
            return newData;
        });
    };

    const renderContent = () => {
        if (activeSection === 'messages') {
            return <AdminMessages />;
        }

        const data = formData[activeSection as Section];

        if (Array.isArray(data)) {
            return (
                <>
                    <div className="text-right mb-4">
                        <button onClick={() => handleAddItem(activeSection as Section)} className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                            Add New Item
                        </button>
                    </div>
                    {data.map((item, index) => (
                        <div key={index} className="mb-6 p-4 border rounded-lg dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="font-semibold text-lg dark:text-white">Item {index + 1}</h4>
                                <button onClick={() => handleRemoveItem(activeSection as Section, index)} className="inline-flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                                    Remove
                                </button>
                            </div>
                            {Object.entries(item).map(([key, value]) => {
                                if (key === 'imageUrl') {
                                    return (
                                        <div key={key} className="mb-3">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">Project Image</label>
                                            {value && <img src={value as string} alt="Project preview" className="mt-2 rounded-lg max-h-40 object-cover" />}
                                            <input 
                                                type="file" 
                                                accept="image/png, image/jpeg, image/webp"
                                                onChange={(e) => handleProjectImageUpload(index, e.target.files ? e.target.files[0] : null)}
                                                className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-200 dark:hover:file:bg-gray-600"
                                            />
                                        </div>
                                    )
                                }
                                if (Array.isArray(value)) {
                                    return (
                                        <div key={key} className="mb-3 p-3 border-t dark:border-gray-700">
                                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize mb-2">{key}</label>
                                             {value.map((val, i) => (
                                                 <div key={i} className="flex items-center gap-2 mb-2">
                                                     <input type="text" value={val} onChange={(e) => handleNestedArrayChange(activeSection as Section, index, key, i, e.target.value)} className="flex-grow mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700"/>
                                                      <button onClick={() => handleRemoveNestedItem(activeSection as Section, index, key, i)} className="p-1 rounded-full text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-gray-700 transition-colors" aria-label="Remove item">
                                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                                          </svg>
                                                      </button>
                                                 </div>
                                             ))}
                                             <button onClick={() => handleAddNestedItem(activeSection as Section, index, key)} className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2 flex items-center gap-1 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                                                Add {key.slice(0, -1)}
                                             </button>
                                        </div>
                                    )
                                }
                                const isLongText = key === 'description' || key === 'summary';
                                const isNumberInput = key === 'level';
                                return (
                                    <div key={key} className="mb-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{key}</label>
                                        {isLongText ? (
                                            <textarea value={String(value)} onChange={(e) => handleInputChange(activeSection as Section, index, key, e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 h-24"/>
                                        ) : isNumberInput ? (
                                            <input type="number" min="0" max="100" value={String(value)} onChange={(e) => handleInputChange(activeSection as Section, index, key, e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700"/>
                                        ) : (
                                            <input type="text" value={String(value ?? '')} onChange={(e) => handleInputChange(activeSection as Section, index, key, e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700"/>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </>
            );
        } else if (typeof data === 'object' && data !== null) {
             return (
                <>
                    {activeSection === 'personalDetails' && (
                        <div className="mb-4 pb-4 border-b dark:border-gray-700">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profile Picture</label>
                            {formData.personalDetails.profilePictureUrl && (
                                <div className="mt-2 relative w-32 h-32">
                                    <img src={formData.personalDetails.profilePictureUrl} alt="Profile Preview" className="rounded-full w-full h-full object-cover shadow-md" />
                                    <button 
                                        onClick={() => handleProfilePictureUpload(null)} 
                                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        aria-label="Remove picture"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            )}
                            <input 
                                type="file" 
                                accept="image/png, image/jpeg, image/webp"
                                onChange={(e) => handleProfilePictureUpload(e.target.files ? e.target.files[0] : null)}
                                className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-200 dark:hover:file:bg-gray-600"
                            />
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Max 2MB. A square image works best.</p>
                        </div>
                    )}

                    {Object.entries(data).map(([key, value]) => {
                        if (key === 'profilePictureUrl') return null; // Handled above

                        if (key === 'resumeUrl') {
                            return (
                                <div key={key} className="mb-4">
                                    <label htmlFor={key} className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">Resume URL</label>
                                    <input
                                        id={key}
                                        type="text"
                                        value={String(value ?? '')}
                                        onChange={(e) => handleInputChange(activeSection as Section, null, key, e.target.value)}
                                        className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700"
                                        placeholder="e.g., Google Drive share link"
                                    />
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Tip: Upload your resume to Google Drive, click "Share", and set "General access" to "Anyone with the link". Then copy the link here.
                                    </p>
                                </div>
                            );
                        }
                        const isTextArea = key === 'summary' || key === 'description';
                        return (
                            <div key={key} className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{key}</label>
                                {isTextArea ? (
                                    <textarea value={String(value)} onChange={(e) => handleInputChange(activeSection as Section, null, key, e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 h-24"/>
                                ) : (
                                    <input type="text" value={String(value)} onChange={(e) => handleInputChange(activeSection as Section, null, key, e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700"/>
                                )}
                            </div>
                        )
                    })}
                </>
             )
        }
        return null;
    };

    const sections: AdminView[] = ['personalDetails', 'workExperience', 'education', 'skills', 'projects', 'certifications', 'achievements', 'seo', 'messages'];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
                <div>
                     <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-green-600 transition-colors">Save Changes</button>
                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">Logout</button>
                </div>
            </header>
            <div className="p-4 md:p-8">
                 {showSaveSuccess && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">Portfolio updated successfully!</div>}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <aside className="md:col-span-1">
                        <nav className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                            <ul>
                                {sections.map(section => (
                                    <li key={section}>
                                        <button onClick={() => setActiveSection(section)} className={`w-full text-left p-3 rounded-md capitalize transition-colors ${activeSection === section ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-semibold' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                            {section.replace(/([A-Z])/g, ' $1')}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>
                    <main className="md:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-3xl font-bold mb-6 capitalize dark:text-white">{activeSection.replace(/([A-Z])/g, ' $1')}</h2>
                        <div className="max-h-[70vh] overflow-y-auto pr-2">
                             {renderContent()}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;