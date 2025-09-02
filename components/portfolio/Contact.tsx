import React, { useState } from 'react';
import SectionTitle from './SectionTitle';
import Card from '../shared/Card';
import { ContactMessage } from '../../types';

const Contact: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !message) {
            setError('Please fill out all fields.');
            setStatus('error');
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError('Please enter a valid email address.');
            setStatus('error');
            return;
        }

        setStatus('sending');
        setError('');

        try {
            const newMessage: ContactMessage = {
                name,
                email,
                message,
                date: new Date().toISOString(),
            };

            const existingMessages: ContactMessage[] = JSON.parse(localStorage.getItem('portfolio-messages') || '[]');
            existingMessages.unshift(newMessage); // Add to the beginning
            localStorage.setItem('portfolio-messages', JSON.stringify(existingMessages));
            
            setStatus('success');
            setName('');
            setEmail('');
            setMessage('');

            setTimeout(() => setStatus('idle'), 3000);
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            setStatus('error');
            console.error(err);
        }
    };

    return (
        <div>
            <SectionTitle>Contact Me</SectionTitle>
            <Card className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} noValidate>
                    <p className="text-center mb-6 text-gray-600 dark:text-gray-300">Have a question or want to work together? Leave a message below.</p>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                            <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"></textarea>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <button type="submit" disabled={status === 'sending'} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-transform transform hover:scale-105">
                            {status === 'sending' ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                     {status === 'success' && <p className="mt-4 text-center text-green-500">Message sent successfully! Thank you.</p>}
                     {status === 'error' && <p className="mt-4 text-center text-red-500">{error}</p>}
                </form>
            </Card>
        </div>
    );
};

export default Contact;
