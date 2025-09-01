import { GoogleGenAI, Type } from "@google/genai";
import { PortfolioData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema = {
    type: Type.OBJECT,
    properties: {
        personalDetails: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING },
                title: { type: Type.STRING },
                email: { type: Type.STRING },
                phone: { type: Type.STRING },
                linkedin: { type: Type.STRING },
                github: { type: Type.STRING },
                leetcode: { type: Type.STRING },
                hackerrank: { type: Type.STRING },
                summary: { type: Type.STRING, description: "A 3-4 sentence professional summary." }
            },
            required: ["name", "title", "email", "summary"]
        },
        education: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    institution: { type: Type.STRING },
                    degree: { type: Type.STRING },
                    fieldOfStudy: { type: Type.STRING },
                    startDate: { type: Type.STRING },
                    endDate: { type: Type.STRING },
                    description: { type: Type.STRING }
                },
                required: ["institution", "degree", "startDate", "endDate"]
            }
        },
        workExperience: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    company: { type: Type.STRING },
                    jobTitle: { type: Type.STRING },
                    startDate: { type: Type.STRING },
                    endDate: { type: Type.STRING },
                    responsibilities: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["company", "jobTitle", "startDate", "endDate", "responsibilities"]
            }
        },
        skills: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    category: { type: Type.STRING, description: "e.g., Programming Languages, Frameworks & Libraries" },
                    name: { type: Type.STRING }
                },
                required: ["category", "name"]
            }
        },
        projects: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    technologies: { type: Type.ARRAY, items: { type: Type.STRING } },
                    link: { type: Type.STRING }
                },
                required: ["name", "description", "technologies"]
            }
        },
        achievements: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING }
                },
                required: ["title", "description"]
            }
        },
        certifications: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    issuingOrganization: { type: Type.STRING },
                    date: { type: Type.STRING },
                    credentialUrl: { type: Type.STRING }
                },
                required: ["name", "issuingOrganization", "date"]
            }
        },
        seo: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING, description: "Meta description for search engines, around 155 characters." }
            },
            required: ["title", "description"]
        }
    }
};

export const generatePortfolioContent = async (resumeText: string): Promise<PortfolioData> => {
    try {
        const prompt = `
            You are an expert career coach and professional resume writer. Your task is to analyze the provided resume/LinkedIn profile text and transform it into a structured, HR-friendly JSON object for a modern portfolio website. Enhance the content by using strong action verbs, quantifying achievements where possible, and ensuring a professional tone. Also generate SEO metadata. Extract certifications and coding profiles like LeetCode and HackerRank if available.

            The output MUST be a valid JSON object matching the provided schema.

            Here is the user's resume/LinkedIn profile content:
            ---
            ${resumeText}
            ---

            Based on this content, generate a complete JSON object. Ensure all fields are filled appropriately. Use 'Present' for ongoing dates. If a field like 'leetcode' or 'hackerrank' is not present in the text, omit it from the JSON.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema
            },
        });

        const jsonText = response.text;
        const parsedData = JSON.parse(jsonText) as PortfolioData;
        
        // Basic validation
        if (!parsedData.personalDetails || !parsedData.workExperience) {
          throw new Error("Generated data is missing essential fields.");
        }
        
        // Ensure array fields exist
        if (!parsedData.certifications) {
            parsedData.certifications = [];
        }


        return parsedData;

    } catch (error) {
        console.error("Error generating portfolio content:", error);
        throw new Error("Failed to generate portfolio content from the provided text. Please check the format and try again.");
    }
};