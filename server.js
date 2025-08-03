import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { generateColdEmail } from './dist/generateEmail.js';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Debug environment variables
console.log('=== ENVIRONMENT DEBUG ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('VERCEL:', process.env.VERCEL);
console.log('GROQ_API_KEY exists:', !!process.env.GROQ_API_KEY);
console.log('GROQ_API_KEY length:', process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.length : 0);
console.log('GROQ_API_KEY first 10 chars:', process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.substring(0, 10) + '...' : 'undefined');
console.log('All env vars:', Object.keys(process.env).filter(key => key.includes('GROQ')));
console.log('========================');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Load AI configuration
let aiConfig = { provider: 'groq', model: 'llama3-8b-8192' };
try {
    const configData = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
    aiConfig = configData.aiConfig;
} catch (error) {
    console.warn('Could not load config.json, using default AI config');
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API endpoint to generate email
app.post('/api/generate-email', async (req, res) => {
    console.log('=== API CALL DEBUG ===');
    console.log('Request received at:', new Date().toISOString());
    console.log('GROQ_API_KEY exists:', !!process.env.GROQ_API_KEY);
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    
    try {
        // Check if API key is available
        if (!process.env.GROQ_API_KEY) {
            console.error('GROQ_API_KEY not found in environment variables');
            return res.status(500).json({ 
                error: 'API key not configured. Please set GROQ_API_KEY environment variable in Vercel dashboard.',
                debug: {
                    nodeEnv: process.env.NODE_ENV,
                    vercel: process.env.VERCEL,
                    envVars: Object.keys(process.env).filter(key => key.includes('GROQ'))
                }
            });
        }

        const formData = req.body; // The frontend sends the entire form data
        console.log('Calling generateColdEmail with formData:', Object.keys(formData));
        const email = await generateColdEmail(formData, aiConfig);
        console.log('Email generated successfully');
        res.json({ email });
    } catch (error) {
        console.error('Error generating email:', error);
        res.status(500).json({ 
            error: error.message || 'Failed to generate email. Please check your API configuration.',
            debug: {
                nodeEnv: process.env.NODE_ENV,
                vercel: process.env.VERCEL,
                apiKeyExists: !!process.env.GROQ_API_KEY
            }
        });
    }
});

// Health check endpoint for Vercel
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        apiKeyConfigured: !!process.env.GROQ_API_KEY,
        apiKeyLength: process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.length : 0,
        nodeEnv: process.env.NODE_ENV,
        vercel: process.env.VERCEL
    });
});

// Serve the main HTML file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Only start the server if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
        console.log(`Using AI config:`, aiConfig);
        console.log(`API Key configured:`, !!process.env.GROQ_API_KEY);
    });
}

// Export for Vercel
export default app;
