// services/geminiService.ts
// Client-side wrapper: sends resumeText to the serverless function which calls Gemini
import { PortfolioData } from '../types';

export const generatePortfolioContent = async (resumeText: string): Promise<PortfolioData> => {
  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText })
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Server error: ${res.status} - ${errText}`);
    }

    const data = await res.json();
    // Basic validation (same as before)
    if (!data.personalDetails || !data.workExperience) {
      throw new Error('Generated data is missing essential fields.');
    }
    if (!data.certifications) data.certifications = [];

    return data as PortfolioData;
  } catch (error) {
    console.error('Error generating portfolio content (client):', error);
    throw new Error('Failed to generate portfolio content from the provided text. Please try again later.');
  }
};
