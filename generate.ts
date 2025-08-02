import { generateColdEmail } from './generateEmail';
import { AIConfig } from './types';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function main() {
  try {
    console.log('📧 Cold Email Generator Starting...\n');
    
    // Read test input
    const input = JSON.parse(fs.readFileSync('./testInput.json', 'utf-8'));
    console.log('📋 Input Data:', JSON.stringify(input, null, 2), '\n');
    
    // Read AI configuration
    let aiConfig: AIConfig;
    try {
      const configData = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
      aiConfig = configData.aiConfig;
    } catch (error) {
      console.error('❌ Error reading config.json. Please create it with your AI provider settings.');
      console.log('\n📝 Copy config.example.json to config.json:');
      console.log('cp config.example.json config.json');
      process.exit(1);
    }
    
    // Check for Groq API key
    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      console.error('❌ Groq API key not found in environment variable: GROQ_API_KEY');
      console.log('\n🔑 Get your FREE Groq API key:');
      console.log('1. Visit: https://console.groq.com/');
      console.log('2. Sign up for a free account');
      console.log('3. Create an API key');
      console.log('\n📝 Set your API key as an environment variable:');
      console.log('export GROQ_API_KEY="your-groq-api-key-here"');
      console.log('\n📝 Or create a .env file with:');
      console.log('GROQ_API_KEY=your-groq-api-key-here');
      process.exit(1);
    }
    
    console.log(`🤖 Using Groq + Llama3 (Fast & Free!)`);
    console.log(`📝 Model: ${aiConfig.model || 'llama3-8b-8192'}`);
    console.log(`🔑 API Key: ${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)}\n`);
    
    // Generate email
    console.log('🤖 Generating cold email...\n');
    const email = await generateColdEmail(input, aiConfig);
    
    console.log('📨 Generated Cold Email:\n');
    console.log('─'.repeat(50));
    console.log(email);
    console.log('─'.repeat(50));
    
    // Save to file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `cold-email-${timestamp}.txt`;
    fs.writeFileSync(filename, email);
    console.log(`\n💾 Email saved to: ${filename}`);
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main(); 