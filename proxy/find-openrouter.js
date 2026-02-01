const fetch = require('node-fetch');
require('dotenv').config();

const key = process.env.OPENROUTER_API_KEY || process.env.HF_API_KEY;

async function findAndTest() {
    console.log('Fetching available models from OpenRouter...');

    try {
        const listTimeout = new AbortController();
        setTimeout(() => listTimeout.abort(), 10000);

        const response = await fetch('https://openrouter.ai/api/v1/models', {
            headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json'
            },
            signal: listTimeout.signal
        });

        if (!response.ok) {
            console.error('Failed to list models:', response.status, await response.text());
            return;
        }

        const data = await response.json();
        const models = data.data || [];

        // Specific Smart Free Models to test
        const candidates = [
            'google/gemma-3-27b-it:free',
            'nousresearch/hermes-3-llama-3.1-405b:free',
            'google/gemini-2.0-flash-lite-preview-02-05:free', // Retry just in case
            'meta-llama/llama-3.1-8b-instruct:free' // Reliable fallback
        ];

        console.log(`Testing ${candidates.length} candidates...`);

        // Test them
        for (const model of candidates) {
            console.log(`\nTesting: ${model}...`);
            console.log(`\nTesting: ${model}...`);
            try {
                const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${key}`,
                        'Content-Type': 'application/json',
                        'HTTP-Referer': 'http://localhost:3000',
                        'X-Title': 'Model Checker'
                    },
                    body: JSON.stringify({
                        model: model,
                        messages: [{ role: 'user', content: 'Say "Working"' }]
                    })
                });

                if (res.ok) {
                    console.log(`✅ WORKING: ${model}`);
                    const json = await res.json();
                    console.log('Output:', json.choices[0].message.content);
                    return; // Found one!
                } else {
                    console.log(`❌ Failed: ${res.status}`);
                }
            } catch (e) {
                console.log(`❌ Network Error: ${e.message}`);
            }
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
}

findAndTest();
