// api/generate.js
// Serverless proxy for Google Generative API using @google/genai (keeps your API key secret).
// This file runs on Vercel serverless functions (Node). Do NOT put the API key into client code.

import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY // set this in Vercel env vars
});

// Reuse the same response schema you used on the client (copied from your file)
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
        summary: { type: Type.STRING, description: "A 3-4 sentence professional summary." },
        resumeUrl: { type: Type.STRING, description: "A public URL to the user's resume, e.g., a Google Drive share link. Omit if not found." },
        profilePictureUrl: { type: Type.STRING, description: "This will be provided by user upload. Leave this field empty." }
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
          name: { type: Type.STRING },
          level: { type: Type.NUMBER, description: "Proficiency level from 0 to 100, where 100 is expert." }
        },
        required: ["category", "name", "level"]
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
          link: { type: Type.STRING },
          imageUrl: { type: Type.STRING, description: "This will be provided by user upload. Leave this field empty." }
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

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Only POST allowed" });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "Server missing GEMINI_API_KEY" });
      return;
    }

    const { resumeText } = req.body;
    if (!resumeText) {
      res.status(400).json({ error: "Missing resumeText in request body" });
      return;
    }

    // Build the same prompt you used in services/geminiService.ts
    const prompt = `
You are an expert career coach and professional resume writer. Your task is to analyze the provided resume/LinkedIn profile text and transform it into a structured, HR-friendly JSON object for a modern portfolio website. Enhance the content by using strong action verbs, quantifying achievements where possible, and ensuring a professional tone. Also generate SEO metadata. Extract certifications and coding profiles like LeetCode and HackerRank if available. For each skill, also provide a 'level' from 0-100 representing proficiency, where 100 is an expert. This should be an objective estimation based on the provided text.

The output MUST be a valid JSON object matching the provided schema. The 'imageUrl' field in projects and 'profilePictureUrl' in personalDetails should be left as an empty string.

Here is the user's resume/LinkedIn profile content:
---
${resumeText}
---
Based on this content, generate a complete JSON object. Ensure all fields are filled appropriately. Use 'Present' for ongoing dates. If a field like 'leetcode', 'hackerrank', or 'resumeUrl' is not present in the text, omit it from the JSON.
    `;

    // Call the SDK generateContent API with responseMimeType JSON and the responseSchema
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // adjust if you want a different model
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    // The SDK returns a `text` property containing the JSON string (same as your client used)
    const jsonText = response?.text;
    if (!jsonText) {
      res.status(500).json({ error: "No response text from model" });
      return;
    }

    const parsedData = JSON.parse(jsonText);
    res.status(200).json(parsedData);

  } catch (err) {
    console.error("API function error:", err);
    res.status(500).json({ error: err?.message || "Unknown server error" });
  }
}
