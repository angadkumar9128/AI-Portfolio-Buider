import React, { useState, useEffect } from 'react';
import { ContactMessage } from '../../types';
import Card from '../shared/Card';

const AdminMessages: React.FC = () => {
    const [messages, setMessages] = useState<ContactMessage[]>([]);

    useEffect(() => {
        try {
            const storedMessages = JSON.parse(localStorage.getItem('portfolio-messages') || '[]');
            setMessages(storedMessages);
        } catch (error) {
            console.error("Failed to parse messages from localStorage", error);
            setMessages([]);
        }
    }, []);
    
    const handleClearMessages = () => {
        if(window.confirm('Are you sure you want to delete all messages? This action cannot be undone.')) {
            localStorage.removeItem('portfolio-messages');
            setMessages([]);
        }
    };

    return (
        <div>
            {messages.length > 0 && (
                <div className="text-right mb-4">
                     <button onClick={handleClearMessages} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm">
                        Clear All Messages
                     </button>
                </div>
            )}

            {messages.length > 0 ? (
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <Card key={index}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-white">{msg.name}</p>
                                    <a href={`mailto:${msg.email}`} className="text-sm text-blue-600 dark:text-blue-400">{msg.email}</a>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(msg.date).toLocaleString()}</p>
                            </div>
                            <p className="mt-4 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{msg.message}</p>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                     <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No messages</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">You have not received any messages yet.</p>
                </div>
            )}
        </div>
    );
};

export default AdminMessages;
