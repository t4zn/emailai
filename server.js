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
    try {
        // Check if API key is available
        if (!process.env.GROQ_API_KEY) {
            console.error('GROQ_API_KEY not found in environment variables');
            return res.status(500).json({ 
                error: 'API key not configured. Please set GROQ_API_KEY environment variable in Vercel dashboard.' 
            });
        }

        const formData = req.body; // The frontend sends the entire form data
        const email = await generateColdEmail(formData, aiConfig);
        res.json({ email });
    } catch (error) {
        console.error('Error generating email:', error);
        res.status(500).json({ 
            error: error.message || 'Failed to generate email. Please check your API configuration.' 
        });
    }
});

// Health check endpoint for Vercel
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        apiKeyConfigured: !!process.env.GROQ_API_KEY 
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
