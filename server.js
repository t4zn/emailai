import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { generateColdEmail, generateMultipleEmails } from './dist/generateEmail.js';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API endpoint to generate email
app.post('/api/generate-email', async (req, res) => {
    try {
        const formData = req.body; // The frontend sends the entire form data
        const email = await generateColdEmail(formData, { provider: 'groq' });
        res.json({ email });
    } catch (error) {
        console.error('Error generating email:', error);
        res.status(500).json({ error: error.message || 'Failed to generate email' });
    }
});

// API endpoint to generate multiple email variations
app.post('/api/generate-multiple-emails', async (req, res) => {
    try {
        const { formData, count = 3 } = req.body;
        const emails = await generateMultipleEmails(formData, { provider: 'groq' }, count);
        res.json({ emails });
    } catch (error) {
        console.error('Error generating multiple emails:', error);
        res.status(500).json({ error: error.message || 'Failed to generate emails' });
    }
});

// Serve the main HTML file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
