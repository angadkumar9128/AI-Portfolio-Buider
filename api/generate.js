// api/generate.js
// Simple proxy: forwards POST requests from the browser to Google Generative API
// Keeps your API key secret by using Vercel environment variable GEMINI_API_KEY

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Only POST allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Server missing GEMINI_API_KEY' });
    return;
  }

  try {
    // Adjust model name if you use a different one
    const model = 'gemini-1.5-mini';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    // Forward the request body from the client to Google
    const googleRes = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify(req.body)
    });

    const data = await googleRes.json();
    res.status(googleRes.status).json(data);
  } catch (err) {
    console.error('Proxy error', err);
    res.status(500).json({ error: err?.message || 'Unknown server error' });
  }
}
